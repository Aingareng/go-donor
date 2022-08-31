class Name {
  private _firstName: string
  private _lastName: string
  constructor(first: string, last: string) {
    this._firstName = first
    this._lastName = last
  }

  public get fullName(): string {
    return `${this._firstName} ${this._lastName}`
  }

}

export default Name