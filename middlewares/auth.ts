import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export class AuthMiddleware {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    //Check cookie is set
    if (!req.cookies?.access_token) {
      res.status(401).json({
        message: "Token is not in cookies",
      });
      return;
    }

    // Verify token
    jwt.verify(
      req.cookies.access_token,
      process.env.JWT_KEY as string,
      (err: any, decoded: any) => {
        // Return if token has ben temperred
        if (err) {
          res.status(400).json({
            error: "Invalid token",
          });
          return;
        }

        // Set user to request
        // req. = decoded;

        // Go to next function
        next();
      }
    );
  }
}
