import { secret } from "@workspace/backend-common/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization ?? "";
  const decoded = jwt.verify(token, secret) as { userId: string };
  if (decoded) {
    req.userId = decoded.userId;
    next();
  } else {
  }
}
