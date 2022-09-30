"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    // lastName: {
    //   type: String,
    //   required: true
    // },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    bloodType: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        require: false
    }
});
exports.default = mongoose_1.default.model('User', User);
