import { Name, Email, Age, Password, Phone, Address } from '../valueObject/main'


class Donor {
  private _name: Name
  private _email: Email
  private _age: Age
  private _password: Password
  private _phone: Phone
  private _address: Address
  private _bloodType: string

  constructor(name: Name, email: Email, age: Age, password: Password, phone: Phone, address: Address, blood: string) {
    this._name = name
    this._email = email
    this._age = age
    this._password = password
    this._phone = phone
    this._address = address
    this._bloodType = blood

  }


  public get name(): Name {
    return this._name
  }

  public get email(): Email {
    return this._email
  }

  public get age(): Age {
    return this._age
  }

  public get password(): Password {
    return this._password
  }

  public get phone(): Phone {
    return this._phone
  }

  public get address(): Address {
    return this._address
  }

  public get blood(): string {
    return this._bloodType
  }





}
// const person: Name = new Name('fahri', 'ngareng')
// const Person: Donor = new Donor(person)
// console.log(Person.name.fullName)

export default Donor