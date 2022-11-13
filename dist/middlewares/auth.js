var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
export class AuthMiddleware {
    verifyToken(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            //Check cookie is set
            if (!((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token)) {
                res.sendStatus(401);
                return;
            }
            // Verify token
            jwt.verify(req.cookies.access_token, process.env.JWT_KEY, (err, decoded) => {
                // Return if token has ben temperred
                if (err) {
                    res.sendStatus(401);
                    return;
                }
                // Go to next function
                next();
            });
        });
    }
}
//# sourceMappingURL=auth.js.map