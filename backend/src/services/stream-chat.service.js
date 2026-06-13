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

export const syncStreamUser = async (user) => {
  try {
    const streamData = await upsertStreamUser({
      id: user._id.toString(),
      name: user.fullName,
      image: user.profilePic || "",
    });

    if (streamData) {
      console.log(`Stream user created for ${streamData.name}`);
    }
  } catch (error) {
    console.error("Stream sync failed:", error.message);
  }
};
