"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Donor {
    constructor(name, email, age, password, phone, address, blood) {
        this._name = name;
        this._email = email;
        this._age = age;
        this._password = password;
        this._phone = phone;
        this._address = address;
        this._bloodType = blood;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get age() {
        return this._age;
    }
    get password() {
        return this._password;
    }
    get phone() {
        return this._phone;
    }
    get address() {
        return this._address;
    }
    get blood() {
        return this._bloodType;
    }
}
// const person: Name = new Name('fahri', 'ngareng')
// const Person: Donor = new Donor(person)
// console.log(Person.name.fullName)
exports.default = Donor;
