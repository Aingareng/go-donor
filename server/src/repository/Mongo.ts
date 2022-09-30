import Donor from "../entity/Donor";
import User from '../repository/Model'
import Email from "../valueObject/Email";
import Repository from "./Repository";
import bcrypt from 'bcrypt'
import { AnyArray } from "mongoose";
export default class Mongo implements Repository {

  public async list(): Promise<void> {
    try {
      const donor: any = await User.find()
      return donor
    } catch (error) {
      console.log("failed to display data")
    }
  }
  public async create(donor: Donor): Promise<void> {
    const obj = {
      name: donor.name.fullName,
      age: donor.age.age,
      email: donor.email.email,
      password: donor.password.hash,
      phone: donor.phone.numberOfPhone,
      address: donor.address.address,
      bloodType: donor.blood

    }
    try {
      const users: any = await new User(obj)
      return users.save()
    } catch (error) {
      console.log("failed to create data")
    }
  }
  public async read(email: Email): Promise<void> {
    try {
      const userEmail: any = await User.findOne(email)
      return userEmail
    } catch (error) {
      console.log("failed to read data")
    }
  }
  public async update(filter: object, change: any): Promise<void> {
    try {
      console.log({ filter, change })
      await User.updateOne(filter, { $set: change })

    } catch (error) {
      console.log("failed to update data")
    }
  }
}