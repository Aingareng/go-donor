class Phone {
  private _noPhone: number
  constructor(number: number) {
    this._noPhone = number
  }


  public get numberOfPhone(): number {
    return this._noPhone
  }

  public set numberOfPhone(number: number) {
    this._noPhone = number
  }
}

export default Phone