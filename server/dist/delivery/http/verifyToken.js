"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(400).json({
            status: res.statusCode,
            message: "Access Denied !"
        });
    try {
        const verify = jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY));
        req.user = verify;
        next();
    }
    catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: "Invalid token !"
        });
    }
};
exports.default = verifyToken;
