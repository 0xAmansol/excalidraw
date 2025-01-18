import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware.js";
import { roomSchema, signUpSchema, userSchema } from "@workspace/common/types";
import { JWT_SECRET } from "@workspace/backend-common/config";
import { prisma } from "@workspace/db/client";

const app = express();
const port = 3001;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedUser = signUpSchema.safeParse(req.body);
  if (!parsedUser.success) {
    res.status(403).json({
      message: "Invalid Inputs",
    });
    return;
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: parsedUser.data.email,
        password: parsedUser.data.password,
        name: parsedUser.data.username,
      },
    });
    res.json({
      message: `user created with userId ${user.id}`,
    });
  } catch (error) {
    res.status(403).json({
      message: "email already exists",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedUser = userSchema.safeParse(req.body);

  if (!parsedUser.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: parsedUser.data?.email,
      password: parsedUser.data.password,
    },
  });

  if (!user) {
    res.status(403).json({
      message: "user unauthorized",
    });
  }

  const userId = user?.id;
  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({ token });
});

app.post("/room", middleware, async (req, res) => {
  const parsedUser = roomSchema.safeParse(req.body);
  if (!parsedUser.success) {
    res.json({
      message: "Invalid room name",
    });
    return;
  }

  const userId = req.userId;

  try {
    const room = await prisma.room.create({
      data: {
        slug: parsedUser.data.name,
        adminId: userId,
      },
    });
    res.json({ roomId: room.id });
  } catch (error) {
    res.status(500).json({
      message: "Error creating room",
    });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
