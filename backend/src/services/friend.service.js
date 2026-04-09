import FriendModel from "../models/FriendModel.model.js";
import FriendRequestModel from "../models/FriendRequest.model.js";

// Gửi lời mời kết bạn
export const sendFriendRequestService = async (sender, receiverId) => {
  if (sender.toString() === receiverId) {
    throw new Error("Cannot add yourself");
  }

  // check đã là bạn chưa
  const existingFriend = await FriendModel.findOne({
    $or: [
      { user1: sender, user2: receiverId },
      { user1: receiverId, user2: sender },
    ],
  });

  if (existingFriend) {
    throw new Error("Already friends");
  }

  // check request 2 chiều
  const existingRequest = await FriendRequestModel.findOne({
    $or: [
      { sender, receiver: receiverId },
      { sender: receiverId, receiver: sender },
    ],
    status: "pending",
  });

  if (existingRequest) {
    throw new Error("Request already exists");
  }

  // xóa request cũ đã bị reject
  await FriendRequestModel.deleteMany({
    $or: [
      { sender, receiver: receiverId },
      { sender: receiverId, receiver: sender },
    ],
    status: "rejected",
  });

  const newRequest = await FriendRequestModel.create({
    sender,
    receiver: receiverId,
    status: "pending"
  });

  return newRequest;
}

// Bạn của bạn chấp nhận
export const acceptFriendRequestService = async (userId, requestId) => {
  const request = await FriendRequestModel.findById(requestId);

  if (!request) {
    throw new Error("Request not found");
  }

  if (request.receiver.toString() !== userId.toString()) {
    throw new Error("Not allowed");
  }

  request.status = "accepted";
  await request.save();

  // sort để tránh (A,B) & (B,A)
  const users = [request.sender.toString(), request.receiver.toString()].sort();

  await FriendModel.create({
    user1: users[0],
    user2: users[1],
  });

  return true;
};

// Bạn của bạn không chấp nhận lời mời kết bạn
export const rejectFriendRequestService = async (requestId) => {
  await FriendRequestModel.findByIdAndUpdate(requestId, {
    status: "rejected",
  });

  return true;
};

// Bạn xóa kết bạn
export const unfriendService = async (userId, friendId) => {
  const deleted = await FriendModel.findOneAndDelete({
    $or: [
      { user1: userId, user2: friendId },
      { user1: friendId, user2: userId },
    ],
  });

  return deleted ? true : false;
};
