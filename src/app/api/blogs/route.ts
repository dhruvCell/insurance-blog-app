import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title, headline, content, image, imageType } = body;

    console.log("Received data:", { title: !!title, headline: !!headline, content: !!content, image: !!image, imageType: !!imageType });

    if (!title || !headline || !content || !image || !imageType) {
      const missing = [];
      if (!title) missing.push('title');
      if (!headline) missing.push('headline');
      if (!content) missing.push('content');
      if (!image) missing.push('image');
      if (!imageType) missing.push('imageType');

      return NextResponse.json({
        error: `Missing required fields: ${missing.join(', ')}`
      }, { status: 400 });
    }

    // Validate base64 image size (max 25MB)
    if (image && image.length > 25 * 1024 * 1024 * 1.37) {
      return NextResponse.json({ error: "Image size exceeds 25MB limit" }, { status: 400 });
    }

    // Convert base64 image to buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const imgBuffer = Buffer.from(base64Data, "base64");

    // Store image in GridFS
    if (!mongoose.connection.db) {
      throw new Error("Database connection not established");
    }
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "images",
    });

    const uploadStream = bucket.openUploadStream(title, {
      contentType: imageType,
    });

    uploadStream.end(imgBuffer);

    // Wait for upload to finish
    await new Promise((resolve, reject) => {
      uploadStream.on("finish", resolve);
      uploadStream.on("error", reject);
    });

    const imageId = uploadStream.id;

    const blog = new Blog({
      title,
      headline,
      content,
      imageId,
      imageType,
    });

    await blog.save();
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
