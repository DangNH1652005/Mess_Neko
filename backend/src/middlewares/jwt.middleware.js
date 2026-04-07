import { env } from "../configs/env.config.js";

export function generateToken(payload, expiresIn = "1h") {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}