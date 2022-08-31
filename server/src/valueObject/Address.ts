class Address {
  private _street: string
  private _district: string
  private _province: string
  private _valAddress: object

  constructor(street: string, district: string, province: string) {
    this._street = street
    this._district = district
    this._province = province
    this._valAddress = {
      street: this._street,
      district: this._district,
      province: this._province
    }
  }

  public get address(): object {
    return this._valAddress
  }

  public setAddress(street: string, district: string, province: string) {
    return this._valAddress = {
      street,
      district,
      province
    }
  }
}

export default Address