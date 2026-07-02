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
