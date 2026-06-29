import { POST_VISIBILITY } from "../constants/post.constant.js";
import Post from "../models/Post.model.js";
import { uploadImage } from "./cloudinary.service.js";
import { deleteCommentsByPostId } from "./comment.service.js";
import { deleteLikesByPostId } from "./like.service.js";

export const createPost = async ({ authorId, content, files, visibility }) => {
  const images = await Promise.all(
    (files ?? []).map((file) => uploadImage(file.buffer, "posts")),
  );

  const post = await Post.create({
    author: authorId,
    content,
    images,
    visibility: visibility ?? POST_VISIBILITY.PUBLIC,
  });

  return post.populate("author", "fullName profilePic");
};

export const getPosts = async ({ cursor, limit = 3 }) => {
  const query = { visibility: POST_VISIBILITY.PUBLIC };

  if (cursor) {
    query._id = { $lt: cursor };
  }

  const posts = await Post.find(query)
    .populate("author", "fullName profilePic")
    .sort({ _id: -1 })
    .limit(limit);

  return {
    posts,
    nextCursor: posts.length === limit ? posts[posts.length - 1]._id : null,
    hasMore: posts.length === limit,
  };
};

export const getPostById = async (postId) => {
  const post = await Post.findById(postId)
    .populate({
      path: "author",
      select: "username fullName avatar",
    })
    .lean();

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return post;
};

export const deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  if (!post.author.equals(userId)) {
    const error = new Error("You are not authorized to delete this post");
    error.statusCode = 403;
    throw error;
  }

  // Xóa toàn bộ comment của post
  await deleteCommentsByPostId(postId);

  // Xóa toàn bộ like của post
  await deleteLikesByPostId(postId);

  // TODO: Xóa ảnh trên Cloudinary nếu có

  // Xóa post
  await Post.findByIdAndDelete(postId);

  return post;
};
