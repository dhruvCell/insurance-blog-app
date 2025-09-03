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

    // Compress the image using sharp (resize and reduce quality)
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 1024, withoutEnlargement: true }) // Resize to max width 1024px
      .jpeg({ quality: 70 }) // Compress JPEG quality to 70%
      .toBuffer();

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
