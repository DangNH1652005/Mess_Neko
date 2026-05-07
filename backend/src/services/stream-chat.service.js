import serverClient from "../configs/stream-chat.config.js";

export const upsertStreamUser = async (userData) => {
  try {
    await serverClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.log("Error upserting Stream user", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    const userIdStr = userId.toString();
    return serverClient.createToken(userIdStr);
  } catch (error) {
    console.log("Error generating Stream token: ", error);
  }
};
