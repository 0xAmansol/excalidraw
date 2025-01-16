import { z } from "zod";

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const roomSchema = z.object({
  name: z.string(),
});

export const signUpSchema = z.object({
  username: z.string(),
  password: z.string(),
});
