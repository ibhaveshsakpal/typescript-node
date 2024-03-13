import { Request, Response } from "express";
import BlogModel, { BlogDocument } from "../model/Blog";
import CommentModel, { CommentDocument } from "../model/Comment";

export const CreateBlog = async (req: Request, res: Response) => {
  const { title, content, author, createdAt, updatedAt, image } =
    req?.body as BlogDocument;
  try {
    const newBlog = new BlogModel({
      title,
      content,
      author,
      createdAt,
      updatedAt,
      image,
    });

    await newBlog.save();

    res.send({ message: "New blog created successfully", data: newBlog });
  } catch (error: any) {
    console.log(error?.message);
    res.send({ message: "Failed to create blog" });
  }
};

export const UpdateBlog = async (req: Request, res: Response) => {
  const { title, content, image } = req?.body as BlogDocument;
  const { id } = req.params;

  try {
    const updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: id },
      {
        title,
        content,
        updatedAt: Date.now(),
        image,
      },
      { new: true, upsert: true }
    );
    // if (updatedBlog) {
    res.send({ message: "Blog updated successfully", data: updatedBlog });
    // }
  } catch (error: any) {
    console.log(error?.message);
    res.send({ message: "Failed to update blog" });
  }
};

export const CreateComment = async (req: Request, res: Response) => {
  const { content, postId, createdAt, updatedAt } =
    req?.body as CommentDocument;

  try {
    const newComment = new CommentModel({
      content,
      postId,
      createdAt,
      updatedAt,
    });

    await newComment.save();

    if (newComment) {
      const updateBlog = await BlogModel.findOneAndUpdate(
        { _id: postId },
        {
          $push: {
            comments: newComment,
          },
        },
        { upsert: true }
      );
      res.send({
        message: "New comment added successfully",
        data: newComment,
        updatedCols: updateBlog,
      });
    }
  } catch (error: any) {
    console.log(error?.message);
    res.send({ message: "Failed to add new comment" });
  }
};

export const UpdateComment = async (req: Request, res: Response) => {
  const { content } = req?.body as CommentDocument;
  const { id } = req.params;

  try {
    const updatedBlog = await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        content,
        updatedAt: Date.now(),
      },
      { new: true, upsert: true }
    );
    // if (updatedBlog) {
    res.send({ message: "Comment updated successfully", data: updatedBlog });
    // }
  } catch (error: any) {
    console.log(error?.message);
    res.send({ message: "Failed to update comment" });
  }
};
