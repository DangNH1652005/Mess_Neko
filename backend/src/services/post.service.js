import { POST_VISIBILITY } from "../constants/post.constant.js";
import Like from "../models/Like.model.js";
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

export const getPosts = async ({ cursor, limit = 3, userId }) => {
  const query = { visibility: POST_VISIBILITY.PUBLIC };

  if (cursor) {
    query._id = { $lt: cursor };
  }

  const posts = await Post.find(query)
    .populate("author", "fullName profilePic")
    .sort({ _id: -1 })
    .limit(limit)
    .lean();

  if (posts.length === 0) {
    return {
      posts,
      nextCursor: null,
      hasMore: false,
    };
  }

  // Query 1 lần duy nhất để biết user hiện tại đã like post nào trong danh sách này
  let likedPostIdSet = new Set();

  if (userId) {
    const postIds = posts.map((p) => p._id);

    const likedPosts = await Like.find({
      user: userId,
      post: { $in: postIds },
    })
      .select("post")
      .lean();

    likedPostIdSet = new Set(likedPosts.map((l) => l.post.toString()));
  }

  const postsWithLikeStatus = posts.map((post) => ({
    ...post,
    isLiked: likedPostIdSet.has(post._id.toString()),
  }));

  return {
    posts: postsWithLikeStatus,
    nextCursor: posts.length === limit ? posts[posts.length - 1]._id : null,
    hasMore: posts.length === limit,
  };
};

export const getPostById = async (postId, userId) => {
  const post = await Post.findById(postId)
    .populate({
      path: "author",
      select: "username fullName profilePic",
    })
    .lean();

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const isLiked = userId
    ? !!(await Like.exists({ post: postId, user: userId }))
    : false;

  return { ...post, isLiked };
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
