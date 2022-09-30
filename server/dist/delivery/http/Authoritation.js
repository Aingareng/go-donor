"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    const token = req.header('auth-token');
    console.log(jsonwebtoken_1.default.JsonWebTokenError);
    try {
        const verified = String(jsonwebtoken_1.default.verify(String(token), String(process.env.SECRET_KEY)));
        req.body = verified;
        // let token = String(req.headers['auth-token'])!.split(' ')[1]
        // res.locals.user = jwt.verify(token, String(process.env.SECRET_KEY))
        next();
    }
    catch (error) {
        console.error(error);
        res.status(403).json({
            status: 'error',
            message: 'failed to verify the token'
        }).end();
    }
};
