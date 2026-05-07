import { generateStreamToken } from "../services/stream-chat.service.js";

export const getStreamToken = (req, res) => {
  try {
    const token = generateStreamToken(req.user._id);
    if (!token) {
      return res.status(500).json({
        message: "Failed to generate Stream token",
      });
    }
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
