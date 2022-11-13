import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, DecodeOptions } from "jsonwebtoken";

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
      (err: VerifyErrors | null, decoded: any) => {
        // Return if token has ben temperred
        if (err) {
          res.sendStatus(401);
          return;
        }

        // Vefiry that toke is not expired
        if (Math.floor(new Date().getTime() / 1000) >= decoded.exp) {
          res.sendStatus(401);
          return;
        }
        // Go to next function
        next();
      }
    );
  }
}
