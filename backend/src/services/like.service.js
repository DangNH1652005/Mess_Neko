import Post from "../models/Post.model.js";
import Like from "../models/Like.model.js";

export const likePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  const existedLike = await Like.findOne({
    post: postId,
    user: userId,
  });

  if (existedLike) {
    const error = new Error("You already liked this post");
    error.statusCode = 400;
    throw error;
  }

  await Like.create({
    post: postId,
    user: userId,
  });

  await Post.findByIdAndUpdate(postId, {
    $inc: {
      likesCount: 1,
    },
  });
};

export const unlikePost = async (postId, userId) => {
  const like = await Like.findOne({
    post: postId,
    user: userId,
  });

  if (!like) {
    const error = new Error("Like not found");
    error.statusCode = 404;
    throw error;
  }

  await Like.findByIdAndDelete(like._id);

  await Post.findByIdAndUpdate(postId, {
    $inc: {
      likesCount: -1,
    },
  });
};

export const deleteLikesByPostId = async (postId) => {
  const result = await Like.deleteMany({
    post: postId,
  });

  return result.deletedCount;
};
