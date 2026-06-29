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
