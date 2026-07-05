import axiosInstance from "../libs/axios.js";

export const getPosts = async ({ cursor = null }) => {
  const response = await axiosInstance.get("/posts", {
    params: {
      cursor,
      limit: 3,
    },
  });

  return response.data;
};

export const createPost = async (data) => {
  const res = await axiosInstance.post("/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getPostDetail = async (postId) => {
  const res = await axiosInstance.get(`/posts/${postId}`)
  return res.data;
}

export const getAllCommentByPostId = async (postId) => {
  const res = await axiosInstance.get(`/posts/${postId}/comments`);
  return res.data;
};

export const createCommentByPostId = async (postId, data) => {
  const res = await axiosInstance.post(`/posts/${postId}/comments`, data);
  return res.data;
};

export const likePostByPostId = async (postId) => {
  const res = await axiosInstance.post(`/posts/${postId}/like`);
  return res.data;
}

export const unlikePostByPostId = async (postId) => {
  const res = await axiosInstance.delete(`posts/${postId}/like`);
  return res.data;
}

