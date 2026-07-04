import Comment from "../models/Comment.model.js";
import Post from "../models/Post.model.js";

export const getAllCommentByPostId = async (postId) => {
  const comments = await Comment.find({ post: postId })
    .populate("author", "username fullName profilePic")
    .sort({ createdAt: -1 })
    .lean();

  return comments;
};

export const createCommentByPostId = async (postId, authorId, content) => {
  const post = await Post.findById(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  const comment = await Comment.create({
    post: post._id,
    author: authorId,
    content: content,
  });

  await post.updateOne({
    $inc: {
      commentsCount: 1,
    },
  });

  return comment;
};

export const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    const error = new Error("Comment not found");
    error.statusCode = 404;
    throw error;
  }

  if (!comment.author.equals(userId)) {
    const error = new Error("You are not authorized to delete this comment");
    error.statusCode = 403;
    throw error;
  }

  await Comment.findByIdAndDelete(commentId);

  await Post.findByIdAndUpdate(comment.post, {
    $inc: {
      commentsCount: -1,
    },
  });

  return comment;
};

export const deleteCommentsByPostId = async (postId) => {
  const result = await Comment.deleteMany({
    post: postId,
  });

  return result.deletedCount;
};
