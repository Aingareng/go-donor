class Email {
  private _email: string
  constructor(email: string) {
    this._email = email
  }

  public get email(): string {
    return this._email
  }

}

export default Email