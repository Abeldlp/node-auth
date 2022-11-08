import { Request, Response } from "express";
import { User } from "../models/user.js";

const user = new User();

export class UserController {
  async getAllUsers(_: Request, res: Response): Promise<void> {
    const users = await user.getAll();
    res.json(users);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const createdUser = await user.create(req.body);
    res.json(createdUser);
  }
}
