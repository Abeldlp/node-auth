import { PrismaClient, User as UserModel } from "@prisma/client";
// import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export class User {
  async getAll(): Promise<UserModel[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async create(userData: UserModel): Promise<UserModel> {
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        username: userData.username,
      },
    });

    return user;
  }
}
