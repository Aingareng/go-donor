"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class Password {
    constructor(salt = '', hash = '') {
        this._salt = salt;
        if (this._salt === '') {
            this._salt = bcrypt_1.default.genSaltSync();
        }
        this._hash = hash;
    }
    get salt() {
        return this._salt;
    }
    get hash() {
        return this._hash = bcrypt_1.default.hashSync(this._hash, this._salt);
    }
    set hash(password) {
        this._hash = bcrypt_1.default.hashSync(password, this._salt);
    }
    verify(password) {
        return bcrypt_1.default.compareSync(password, this._hash);
    }
}
exports.default = Password;
