import { findUserByName } from "../services/user.service.js";

export const searchUserController = async (req, res) => {
  try {
    const currentUser = req.user._id;
    const { name } = req.query;

    const users = await findUserByName(name, currentUser);

    res.status(200).json({
      success: true,
      data: users,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};