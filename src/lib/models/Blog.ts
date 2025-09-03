import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  headline: string;
  content: string;
  imageId: mongoose.Types.ObjectId; // Reference to GridFS file
  imageType: string; // MIME type of the image
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  viewCount: number; // Number of times the blog has been viewed
}

const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    imageType: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Clear any existing model to ensure schema updates are applied
if (mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

export default mongoose.model<IBlog>("Blog", BlogSchema);
