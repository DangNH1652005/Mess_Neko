import mongoose, { Mongoose } from "mongoose";
import bcrypt, { hash } from 'bcrypt';
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
 
    profilePic: {
      type: String,
      default: "https://cdn-icons-png.freepik.com/512/6596/6596121.png",
    },

    bio: {
      type: String,
      default: "",
    },

    nativeLanguage: {
      type: String,
      default: ""
    },

    learningLanguage: {
      type: String,
      default: ""
    },

    location: {
      type: String,
      default: ""
    },

    isOnboarded: {
      type: Boolean,
      default: false
    },

    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "users"
      }
    ],

    // user đã xác nhận email chưa
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function() {
  if(!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);  
})

userSchema.methods.matchPassword = async function(enteredPassword) {
  const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
  return isPasswordCorrect;
}

const User = model("users", userSchema);

export default User;