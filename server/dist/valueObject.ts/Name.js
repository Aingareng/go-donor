"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Name {
    constructor(first, last) {
        this._firstName = first;
        this._lastName = last;
    }
    get fullName() {
        return `${this._firstName} ${this._lastName}`;
    }
}
exports.default = Name;
