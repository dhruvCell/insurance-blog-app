import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import mongoose from "mongoose";
import { generateUniqueSlug, isValidSlug } from "@/lib/utils";
import sharp from "sharp";

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
    const { title, headline, content, image, imageType, slug: providedSlug } = body;

    console.log("Received data:", { title: !!title, headline: !!headline, content: !!content, image: !!image, imageType: !!imageType, slug: !!providedSlug });

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

    // Handle slug generation/validation
    let finalSlug: string;
    if (providedSlug && providedSlug.trim()) {
      // Validate provided slug
      if (!isValidSlug(providedSlug.trim())) {
        return NextResponse.json({
          error: "Invalid slug format. Slug can only contain lowercase letters, numbers, and hyphens."
        }, { status: 400 });
      }
      finalSlug = providedSlug.trim();
    } else {
      // Generate slug from title
      finalSlug = await generateUniqueSlug(title);
    }

    console.log("Final slug to be used:", finalSlug);

    // Validate base64 image size (max 1MB)
    if (image && image.length > 1 * 1024 * 1024 * 1.37) {
      // Compress the image to approximately 1MB using sharp
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      let compressedBuffer = await sharp(buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .jpeg({ quality: 50, progressive: true })
        .toBuffer();

      const maxSize = 1024 * 1024; // 1MB
      if (compressedBuffer.length > maxSize) {
        compressedBuffer = await sharp(buffer)
          .resize({ width: 600, withoutEnlargement: true })
          .jpeg({ quality: 30, progressive: true })
          .toBuffer();
      }

      // Convert compressed buffer back to base64 string
      const compressedBase64 = compressedBuffer.toString("base64");
      const compressedImage = `data:image/jpeg;base64,${compressedBase64}`;

      // Replace original image with compressed image
      body.image = compressedImage;
      body.imageType = "image/jpeg";
    }

    // Convert base64 image to buffer
    const base64Data = body.image.replace(/^data:image\/\w+;base64,/, "");
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

    console.log("Creating blog with data:", {
      title,
      headline,
      content: content.substring(0, 50) + "...",
      imageId,
      imageType,
      slug: finalSlug,
    });

    const blog = new Blog({
      title,
      headline,
      content,
      imageId,
      imageType,
      slug: finalSlug,
    });

    console.log("Blog document before save:", blog);
    console.log("Blog slug before save:", blog.slug);

    const savedBlog = await blog.save();

    console.log("Blog document after save:", savedBlog);
    console.log("Blog slug after save:", savedBlog.slug);

    return NextResponse.json(savedBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
