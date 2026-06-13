import mongoose, { model } from "mongoose";

const verificationOtpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    otpHash: {
      type: String,
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// auto delete otp when expires
verificationOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const VerificationOtp = model("verification_otps", verificationOtpSchema);

export default VerificationOtp;
