"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(street, district) {
        this._street = street;
        this._district = district;
        this._valAddress = {
            street: this._street,
            district: this._district,
            province: "Sulawesi Tengah"
        };
    }
    get address() {
        return this._valAddress;
    }
    setAddress(street, district) {
        return this._valAddress = {
            street,
            district
        };
    }
}
exports.default = Address;
