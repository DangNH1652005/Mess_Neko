import FriendsRequest from "../models/FriendRequest.model.js";
import User from "../models/User.model.js";

export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentUser.friends } }, // exclude current user's friends
        { isOnboarded: true },
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("Error in getRecommendedUsers controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage",
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getMyFriends controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
      return res.status(400).json({
        message: "You can't send friend request to yourself",
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        message: "Recipient not found",
      });
    }

    if (recipient.friends.includes(myId)) {
      return res.status(400).json({
        message: "You are already friends with this user",
      });
    }

    const existingRequest = await FriendsRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "A friend request already exists between you and this user",
      });
    }

    const friendRequest = await FriendsRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(200).json(friendRequest);
  } catch (error) {
    console.log("Error in sendFriendRequest controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendsRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found",
      });
    }

    // Verify the current user is the recipient
    if (friendRequest.recipient._id.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        message: "You are not authorized to accept this request",
      });
    }
    
    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to the other's friends array
    // $addToSet: adds elements to an array only if they do not already exists
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({
      message: "Friend request accepted",
    });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const incomingReqs = await FriendsRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage",
    );

    const acceptedReqs = await FriendsRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({
      incomingReqs,
      acceptedReqs,
    });
  } catch (error) {
    console.log("Error in getFriendRequests controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getOutgoingFriendReqs = async (req, res) => {
  try {
    const outgoingRequests = await FriendsRequest.find({
      sender: req.user._id,
      status: 'pending'
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");
    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getFriendRequests controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
