import { Request, Response } from "express";
import { User } from "../models/user.js";

const user = new User();

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    //Logic to create user here
  }

  async login(req: Request, res: Response): Promise<void> {
    //Logic to login user here
  }
}
