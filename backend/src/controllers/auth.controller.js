import bcrypt from "bcrypt";
import { registerUser, verifyEmail } from "../services/auth.service.js";

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
    // mai viet tiep
}
