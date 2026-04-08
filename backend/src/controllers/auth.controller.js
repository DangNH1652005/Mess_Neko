import bcrypt from "bcrypt";
import { registerUser, verifyEmail, loginUser } from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const response = await registerUser({ username, email, passwordHash });
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.params;
  const user = await verifyEmail(token);
  if (!user) {
    return res.status(400).send("Token expired or invalid");
  }
  res.send("Email verified and user created successfully!");
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await loginUser(email, password, res);
      res.status(200).json({
        message: 'Login successful',
        user: userData
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
  // Xóa cookie JWT (nếu bạn đang dùng cookie để lưu token)
  res.clearCookie("jwt", {
    httpOnly: true, // giống khi set cookie
    secure: true,   // true nếu HTTPS
    sameSite: "strict",
  });

  // Trả về thông báo
  res.status(200).json({ message: "Logged out successfully" });
}

export const checkAuth = async (req, res) => {
  try {
    res.status(201).json(req.user);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message });
  }
}
