import { likePost, unlikePost } from "../services/like.service.js";

export const likePostController = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;

    await likePost(postId, userId);

    return res.status(201).json({
      message: "Liked post successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const unlikePostController = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;

    await unlikePost(postId, userId);

    return res.status(200).json({
      message: "Unliked post successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};
