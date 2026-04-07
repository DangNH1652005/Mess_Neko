import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .trim(),

  email: z.string().email("Invalid email format").trim(),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginScheme = z.object({
  email: z.string().email("Invalid email format").trim(),

  password: z.string().min(6, "Password must be at least 6 characters"),
});
