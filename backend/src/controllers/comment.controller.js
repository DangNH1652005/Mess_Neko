import { createCommentByPostId, deleteComment, getAllCommentByPostId } from "../services/comment.service.js";

export const getAllCommentByPostIdController = async (req, res) => {
  try {
    const { id: postId } = req.params;

    const comments = await getAllCommentByPostId(postId);

    return res.status(200).json({
      message: "Get comments successfully",
      data: comments,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};


export const createCommentByPostIdController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const authorId = req.user.id;

    const comment = await createCommentByPostId(
      postId,
      authorId,
      content,
    );

    return res.status(201).json({
      message: "Comment created successfully",
      data: comment,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const deleteCommentController = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const userId = req.user._id;

    await deleteComment(commentId, userId);

    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};