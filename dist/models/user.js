var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class User {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany();
            return users;
        });
    }
    getByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findFirst({
                where: {
                    email: userEmail,
                },
            });
            return user;
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.create({
                    data: {
                        email: userData.email,
                        password: userData.password,
                        username: userData.username,
                        roleId: userData.role_id || null,
                    },
                });
                return user;
            }
            catch (error) {
                return null;
            }
        });
    }
}
//# sourceMappingURL=user.js.map