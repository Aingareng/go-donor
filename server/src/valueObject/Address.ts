class Address {
  private _street: string
  private _district: string
  private _valAddress: object

  constructor(street: string, district: string) {
    this._street = street
    this._district = district
    this._valAddress = {
      street: this._street,
      district: this._district,
      province: "Sulawesi Tengah"
    }
  }

  public get address(): object {
    return this._valAddress
  }

  public setAddress(street: string, district: string) {
    return this._valAddress = {
      street,
      district
    }
  }
}

export default Address