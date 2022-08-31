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
// const p: Phone = new Phone(8123)
// p.numberOfPhone = (82222)
// console.log(p.numberOfPhone)
exports.default = Phone;
