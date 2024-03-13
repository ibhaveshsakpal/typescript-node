import mongoose, { Document, Schema } from "mongoose";

export interface BlogDocument extends Document {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  comments?: [string];
}

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  ],
});

const BlogModel = mongoose.model<BlogDocument>("BlogPost", BlogSchema);

export default BlogModel;
