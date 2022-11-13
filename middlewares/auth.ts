import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export class AuthMiddleware {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    //Check cookie is set
    if (!req.cookies?.access_token) {
      res.status(401).json({
        message: "Unauthorized",
        error: req.cookies,
      });
      return;
    }

    // Verify token
    const token: string | JwtPayload = jwt.verify(
      req.cookies.access_token,
      process.env.JWT_KEY as string
    );

    if (typeof token === "string") {
      res.status(400).json({
        error: "Invalid token",
      });
    }

    next();
  }
}
