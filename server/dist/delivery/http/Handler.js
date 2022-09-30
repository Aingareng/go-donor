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
const Donor_1 = __importDefault(require("../../entity/Donor"));
const express_1 = require("express");
const Model_1 = __importDefault(require("../../repository/Model"));
const Mongo_1 = __importDefault(require("../../repository/Mongo"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Authorization_1 = __importDefault(require("../middleware/Authorization"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const main_1 = require("../../valueObject/main");
const mongodb_1 = require("mongodb");
exports.default = (repository) => {
    const router = (0, express_1.Router)();
    router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let emailValidate = yield Model_1.default.findOne({ email: req.body.email });
        let name = new main_1.Name(req.body.firstName, req.body.lastName);
        let email = new main_1.Email(req.body.email);
        let age = new main_1.Age(req.body.age);
        let password = new main_1.Password('', req.body.password);
        let phone = new main_1.Phone(req.body.phone);
        let address = new main_1.Address(req.body.address.street, req.body.address.district);
        let bloodType = req.body.bloodType;
        const userRegis = new Mongo_1.default();
        if (!emailValidate) {
            try {
                const users = new Donor_1.default(name, email, age, password, phone, address, bloodType);
                userRegis.create(users);
            }
            catch (error) {
            }
            res.json({
                name: name.fullName,
                email: email.email,
                age: age.age,
                password: password.hash,
                phone: phone.numberOfPhone,
                address: address.address,
                blood: bloodType
            });
        }
        else {
            res.status(400).json({
                "status": "error",
                "message": "gagal menyimpan pengguna"
            });
        }
    }));
    router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getUser = yield Model_1.default.findOne({ email: req.body.email });
            const userPassword = getUser === null || getUser === void 0 ? void 0 : getUser.password;
            const userEmail = getUser === null || getUser === void 0 ? void 0 : getUser.email;
            const reqPassword = req.body.password;
            const verifyPassword = new main_1.Password('', userPassword);
            const result = yield verifyPassword.verify(String(reqPassword));
            if (!userEmail)
                return res.status(400).json({
                    status: res.statusCode,
                    message: "Email Anda Salah"
                });
            if (!result)
                return res.status(400).json({
                    status: res.statusCode,
                    message: "Password Anda Salah"
                });
            const accessToken = jsonwebtoken_1.default.sign({ email: userEmail }, String(process.env.ACCESS_TOKEN), { expiresIn: '30s' });
            const refreshToken = jsonwebtoken_1.default.sign({ email: userEmail }, String(process.env.REFRESH_TOKEN), { expiresIn: '1d' });
            const userUpdate = new Mongo_1.default();
            userUpdate.update({ userEmail }, { refresh_token: refreshToken });
            res.header('accessToken', accessToken);
            res.json({ accessToken, refreshToken });
        }
        catch (error) {
            res.json({ ['login error message']: error }).status(404);
        }
    }));
    router.delete('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken)
                return res.sendStatus(204);
            const user = yield Model_1.default.findOne({ refresh_token: refreshToken });
            if (!user)
                return res.sendStatus(204);
            const userUpdate = new Mongo_1.default();
            userUpdate.update({ refresh_token: user.refresh_token }, { refresh_token: null });
            res.clearCookie('refreshToken');
            return res.sendStatus(200);
        }
        catch (error) {
            res.sendStatus(400);
        }
    }));
    router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const eventUpdate = new Mongo_1.default();
        const { id } = req.params;
        const { phone, address } = req.body;
        try {
            eventUpdate.update({ _id: new mongodb_1.ObjectId(id) }, { phone, address });
            res.json({ message: "update data success" });
        }
        catch (error) {
            res.send("gagal update");
        }
    }));
    router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield new Mongo_1.default();
            const data = yield user.list();
            res.json({
                dataDonor: data
            });
        }
        catch (error) {
            res.json({ ['login error message']: error });
        }
    }));
    router.post('/donor', Authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userItem = [];
        try {
            const userBloodSelect = yield Model_1.default.find({ bloodType: req.body.bloodType });
            userItem.push(...userBloodSelect);
            res.send(userItem);
            if (userItem.length == 0) {
                res.status(400);
            }
        }
        catch (error) {
            res.json({ ['table error message']: error });
        }
    }));
    router.post('/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const refreshToken = req.body.refreshToken;
            if (!refreshToken)
                return res.sendStatus(401);
            const user = yield Model_1.default.findOne({ refresh_token: refreshToken });
            if (!user)
                return res.sendStatus(403);
            jsonwebtoken_1.default.verify(refreshToken, String(process.env.REFRESH_TOKEN), (err, decoded) => {
                if (err)
                    return res.sendStatus(403);
                const accessToken = jsonwebtoken_1.default.sign({ email: user.email }, String(process.env.ACCESS_TOKEN), {
                    expiresIn: '30s'
                });
                res.json({ accessToken });
            });
        }
        catch (error) {
            console.error(error);
        }
    }));
    return router;
};
