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

// const p: Phone = new Phone(8123)
// p.numberOfPhone = (82222)
// console.log(p.numberOfPhone)


export default Phone