import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { secret } from "@workspace/backend-common/config";
import { userSchema } from "@workspace/common/types";

const app = express();

app.post("/signup", (req, res) => {
  const user = userSchema.safeParse(req.body);
  if (user.success) {
    res.json({ success: true });
  } else {
    res.json({
      message: "Invalid Inputs",
    });
  }
});

app.post("/signin", (req, res) => {
  const userId = 1;
  const token = jwt.sign({ userId }, secret);

  res.json({ token });
});

app.post("/room", middleware, (req, res) => {
  res.json({ userId: req.userId });
});

const port = 3001;

app.listen(port);
