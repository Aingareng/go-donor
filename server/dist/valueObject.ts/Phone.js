"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Phone {
    constructor(number) {
        this._noPhone = number;
    }
    get numberOfPhone() {
        return this._noPhone;
    }
    set numberOfPhone(number) {
        this._noPhone = number;
    }
}
exports.default = Phone;
