import bcrypt from 'bcrypt';

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const verifyOtpCode = async (verification, otp) => {

  return bcrypt.compare(otp, verification.otpHash);
};
