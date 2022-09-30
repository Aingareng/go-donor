"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Model_1 = __importDefault(require("../../repository/Model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refresh = req.headers.refreshToken;
        if (!refresh)
            return res.status;
        const user = yield Model_1.default.findOne({ refresh_token: refresh });
        if (!user)
            return res.status;
        const email = user.email;
        jsonwebtoken_1.default.verify(refresh, String(process.env.REFRESH_TOKEN), (err, decoded) => {
            if (err)
                return res.status;
            const access_token = jsonwebtoken_1.default.sign({ email: email }, String(process.env.ACCESS_TOKEN), {
                expiresIn: '30s'
            });
            res.json(access_token);
        });
    }
    catch (error) {
    }
});
