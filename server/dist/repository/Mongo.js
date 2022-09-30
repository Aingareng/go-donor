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
const Model_1 = __importDefault(require("../repository/Model"));
class Mongo {
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const donor = yield Model_1.default.find();
                return donor;
            }
            catch (error) {
                console.log("failed to display data");
            }
        });
    }
    create(donor) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = {
                name: donor.name.fullName,
                age: donor.age.age,
                email: donor.email.email,
                password: donor.password.hash,
                phone: donor.phone.numberOfPhone,
                address: donor.address.address,
                bloodType: donor.blood
            };
            try {
                const users = yield new Model_1.default(obj);
                return users.save();
            }
            catch (error) {
                console.log("failed to create data");
            }
        });
    }
    read(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userEmail = yield Model_1.default.findOne(email);
                return userEmail;
            }
            catch (error) {
                console.log("failed to read data");
            }
        });
    }
    update(filter, change) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log({ filter, change });
                yield Model_1.default.updateOne(filter, { $set: change });
            }
            catch (error) {
                console.log("failed to update data");
            }
        });
    }
}
exports.default = Mongo;
