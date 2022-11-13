import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

export class AuthMiddleware {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    //Check cookie is set
    if (!req.cookies?.access_token) {
      res.sendStatus(401);
      return;
    }

    // Verify token
    jwt.verify(
      req.cookies.access_token,
      process.env.JWT_KEY as string,
      (err: VerifyErrors | null, decoded: {} | undefined) => {
        // Return if token has ben temperred
        if (err) {
          res.sendStatus(401);
          return;
        }

        // Go to next function
        next();
      }
    );
  }
}
