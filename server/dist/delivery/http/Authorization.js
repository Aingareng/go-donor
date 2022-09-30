"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null)
            return res.sendStatus(401);
        jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY), (err, decoded) => {
            if (err)
                return res.status(403).json({ message: "Silahkan login terlebih dahulu" });
            req.body.email = decoded.email;
            next();
        });
    }
    catch (error) {
        console.error(error);
        res.status(403).json({
            status: 'error',
            message: 'failed to verify the token'
        }).end();
    }
};
