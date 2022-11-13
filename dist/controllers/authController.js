var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const user = new User();
export class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            // Validate that request is correct
            if (!(body.email && body.password && body.username)) {
                // If badRequest abort
                res.status(400).send({
                    error: "All fields are required",
                });
                return;
            }
            // hash password with bcrypt
            const hashedPassword = yield bcrypt.hash(body.password, 10);
            // Create the user
            const createdUser = yield user.create(Object.assign(Object.assign({}, body), { password: hashedPassword }));
            if (!createdUser) {
                res.status(400).json({
                    message: "Something went wrong",
                });
                return;
            }
            // Generate a token
            const token = jwt.sign({
                id: createdUser.id,
                username: createdUser.username,
                email: createdUser.email,
                role: createdUser === null || createdUser === void 0 ? void 0 : createdUser.roleId,
            }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
            // Send back token
            res.cookie("access_token", token).json({
                message: `${createdUser.username} successfully created!`,
                token: token,
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate that request is correct
            const body = req.body;
            // Validate that request is correct
            if (!(body.email && body.password)) {
                // If badRequest abort
                res.sendStatus(400);
                return;
            }
            // Get user where email
            const selectedUser = yield user.getByEmail(body.email);
            if (!selectedUser) {
                res.sendStatus(401);
                return;
            }
            // Compare request password to database password
            const correctPassword = yield bcrypt.compare(body.password, selectedUser.password);
            // If not same return unauthorized
            if (!correctPassword) {
                res.sendStatus(401);
                return;
            }
            //Generate new token
            const token = jwt.sign({
                id: selectedUser.id,
                username: selectedUser.username,
                email: selectedUser.email,
                role: selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.roleId,
            }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
            // Set cookie token
            res
                .cookie("access_token", token, {
                httpOnly: true,
            })
                .status(200)
                .json({
                message: `${selectedUser.username} you are logged in!`,
                token: token,
            });
        });
    }
}
//# sourceMappingURL=authController.js.map