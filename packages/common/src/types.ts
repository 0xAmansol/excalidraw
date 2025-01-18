import { z } from "zod";

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

export const roomSchema = z.object({
  name: z.string(),
});

export const signUpSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  username: z.string().min(1),
});
