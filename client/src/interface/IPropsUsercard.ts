export default interface IPropsUsercard {
  getContact: any,
  typeBlood: string,
  userName: string,
  userEmail: string,
  address: {
    street: string,
    district: string,
    province?: string
  }
}