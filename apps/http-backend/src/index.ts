import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@workspace/backend-common/config";
import { userSchema } from "@workspace/common/types";
import { prisma } from "@workspace/db/client";

const app = express();

app.post("/signup", async (req, res) => {
  const user = userSchema.safeParse(req.body);
  if (user.success) {
    await prisma.user.create({
      data: {
        username: user.data.username,
        password: user.data.password,
      },
    });
    res.json({ success: true });
  } else {
    res.json({
      message: "Invalid Inputs",
    });
  }
});

app.post("/signin", (req, res) => {
  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({ token });
});

app.post("/room", middleware, (req, res) => {
  res.json({ userId: req.userId });
});

const port = 3001;

app.listen(port);
