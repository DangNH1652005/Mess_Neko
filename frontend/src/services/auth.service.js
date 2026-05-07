import axiosInstance from "../libs/axios.js";

export const getAuthUser = async () => {
  try {
    const me = await axiosInstance.get("/auth/me");
    return me.data;
  } catch (error) {
    console.log("Error in getAuthUser", error);
    return null;
  }
};

export const signup = async (data) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};
