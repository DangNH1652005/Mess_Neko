import { createPost, getPostById, getPosts } from "../services/post.service.js";
import { createPostSchema } from "../validators/post.validator.js";

export const createPostController = async (req, res) => {
  try {
    const { error, value } = createPostSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((d) => d.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const authorId = req.user._id;
    const { content, visibility } = value;
    const files = req.files ?? [];

    const post = await createPost({ authorId, content, files, visibility });

    return res.status(201).json({ message: "Post created", data: post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/*
  First load (no cursor needed):
  GET http://localhost:3000/api/posts 
  {
    "message": "Get posts successfully",
    "posts": [...],
    "nextCursor": "684acf1e2f4b3c001e8d1a77",
    "hasMore": true
  }

  Scroll down to load more — take nextCursor from previous response and pass it:
  GET http://localhost:3000/api/posts?cursor=684acf1e2f4b3c001e8d1a77
*/
export const getPostsController = async (req, res) => {
  try {
    const { cursor, limit } = req.query;

    const data = await getPosts({
      cursor: cursor || null,
      limit: parseInt(limit) || 3,
    });

    return res.status(200).json({ message: "Get posts successfully", ...data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPostByIdController = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const post = await getPostById(postId);

    return res.status(200).json({
      message: "Get post successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
