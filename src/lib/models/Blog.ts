import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  headline: string;
  content: string;
  imageId: mongoose.Types.ObjectId; // Reference to GridFS file
  imageType: string; // MIME type of the image
  createdAt: Date;
  updatedAt: Date;
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
