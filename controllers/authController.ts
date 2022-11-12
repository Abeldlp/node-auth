import { Request, Response } from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

const user = new User();

interface RegisterRequestBody {
  email: string;
  password: string;
  username: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const body: RegisterRequestBody = req.body;

    // Validate that request is correct
    if (!(body.email && body.password && body.username)) {
      // If badRequest abort
      res.status(400).send({
        error: "All fields are required",
      });
      return;
    }
    // hash password with bcrypt
    const hashedPassword: string = await bcrypt.hash(body.password, 10);

    // Create the user
    user.create({ ...body, password: hashedPassword });

    // Generate a token

    res.json({
      requestBody: body,
    });
    // Send back token
  }

  async login(req: Request, res: Response): Promise<void> {
    // validate that request is correct
    const body: LoginRequestBody = req.body;

    // Validate that request is correct
    if (!(body.email && body.password)) {
      // If badRequest abort
      res.status(400).send({
        error: "All fields are required",
      });
      return;
    }
    // Get user where email
    const selectedUser = await user.getByEmail(body.email);

    if (!selectedUser) {
      res.status(429).send({
        error: "Unauthorized",
      });
      return;
    }

    // Compare request password to database password
    const correctPassword: boolean = await bcrypt.compare(
      body.password,
      selectedUser.password
    );

    // If not same return unauthorized
    if (!correctPassword) {
      res.status(429).send({
        error: "Unauthorized",
      });
      return;
    }
    // Else return token
    res.send(`${selectedUser.username} you are logged in!`);
  }
}
