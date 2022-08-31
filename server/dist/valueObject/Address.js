"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(street, district, province) {
        this._street = street;
        this._district = district;
        this._province = province;
        this._valAddress = {
            street: this._street,
            district: this._district,
            province: this._province
        };
    }
    get address() {
        return this._valAddress;
    }
    setAddress(street, district, province) {
        return this._valAddress = {
            street,
            district,
            province
        };
    }
}
exports.default = Address;
