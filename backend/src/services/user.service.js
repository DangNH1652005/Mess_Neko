import UserModel from "../models/User.model.js";

export const findUserByName = async (name, currentUserId) => {
  // check name (optional nhưng nên có)
  if (!name || name.trim() === "") {
    return [];
  }

  const users = await UserModel.find({
    _id: { $ne: currentUserId },
    username: { $regex: name, $options: "i" },
  }).select("-password");

  return users;
}