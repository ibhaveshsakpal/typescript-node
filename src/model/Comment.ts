import mongoose, { Document, Schema } from "mongoose";

export interface CommentDocument extends Document {
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
}

const CommentSchema = new Schema({
  content: {
    type: String,
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
  postId: {
    type: Schema.Types.ObjectId,
    ref: "BlogPost",
    required: true,
  },
});

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;
