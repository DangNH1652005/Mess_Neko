import {
  sendFriendRequestService,
  acceptFriendRequestService,
  rejectFriendRequestService,
  unfriendService,
} from "../services/friend.service.js";

// gửi lời mời kết bạn
export const sendFriendRequest = async (req, res) => {
  try {
    const sender = req.user._id;
    const { receiverId } = req.body;

    const result = await sendFriendRequestService(sender, receiverId);

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// bạn của bạn sẽ chấp nhận lời mời kết bạn đó
export const acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { requestId } = req.params;

    await acceptFriendRequestService(userId, requestId);

    res.json({ message: "Friend request accepted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// bạn của bạn không chấp nhận lời mời kết bạn
export const rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    await rejectFriendRequestService(requestId);

    res.json({ message: "Rejected" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa kết bạn
export const unfriend = async (req, res) => {
  try {
    const userId = req.user._id;
    const { friendId } = req.params;

    const result = await unfriendService(userId, friendId);

    if (!result) {
      return res.status(404).json({ message: "You haven't befriended this person yet" });
    }

    res.json({ message: "Unfriended successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};