import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    if (!mongoose.connection.db) {
      return NextResponse.json({ error: "Database connection not established" }, { status: 500 });
    }

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "images",
    });

    // Read the incoming file as a buffer
    const data = await request.arrayBuffer();
    const buffer = Buffer.from(data);

    // Compress the image using sharp (resize and reduce quality to target ~1MB)
    let compressedBuffer = await sharp(buffer)
      .resize({ width: 800, withoutEnlargement: true }) // Resize to max width 800px
      .jpeg({ quality: 50, progressive: true }) // Compress JPEG quality to 50% with progressive loading
      .toBuffer();

    // If still over 1MB, compress further
    const maxSize = 1024 * 1024; // 1MB
    if (compressedBuffer.length > maxSize) {
      compressedBuffer = await sharp(buffer)
        .resize({ width: 600, withoutEnlargement: true }) // Smaller width
        .jpeg({ quality: 30, progressive: true }) // Lower quality
        .toBuffer();
    }

    // Create upload stream to GridFS
    const uploadStream = bucket.openUploadStream("compressed-image.jpg", {
      contentType: "image/jpeg",
    });

    // Upload the compressed image buffer
    uploadStream.end(compressedBuffer);

    // Wait for upload to finish and get file id
    const fileId = await new Promise<mongoose.Types.ObjectId>((resolve, reject) => {
      uploadStream.on("finish", (file: { _id: mongoose.Types.ObjectId }) => resolve(file._id));
      uploadStream.on("error", reject);
    });

    return NextResponse.json({ message: "Image uploaded successfully", fileId });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
