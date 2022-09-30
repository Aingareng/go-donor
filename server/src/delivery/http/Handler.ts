import Donor from '../../entity/Donor'
import Repository from '../../repository/Repository'
import { Router, Request, Response } from 'express'
import User from '../../repository/Model'
import Mongo from '../../repository/Mongo'
import jwt from 'jsonwebtoken'
import Authorization from '../middleware/Authorization';
import RefreshToken from '../middleware/RefreshToken'
import { Client, LocalAuth } from "whatsapp-web.js";
import fs from "fs";
import dotenv from "dotenv"
dotenv.config()

import { Name, Email, Age, Password, Phone, Address } from '../../valueObject/main'
import { ObjectId } from 'mongodb'

export default (repository: Repository) => {
  const router: Router = Router()


  router.post('/register', async (req: Request, res: Response) => {
    let emailValidate = await User.findOne({ email: req.body.email })

    let name: Name = new Name(req.body.firstName, req.body.lastName)
    let email: Email = new Email(req.body.email)
    let age: Age = new Age(req.body.age)
    let password: Password = new Password('', req.body.password)
    let phone: Phone = new Phone(req.body.phone)
    let address: Address = new Address(req.body.address.street, req.body.address.district)
    let bloodType: string = req.body.bloodType

    const userRegis: Repository = new Mongo()

    if (!emailValidate) {

      try {

        const users: Donor = new Donor(name, email, age, password, phone, address, bloodType)
        userRegis.create(users)

      } catch (error) {
      }
      res.json({
        name: name.fullName,
        email: email.email,
        age: age.age,
        password: password.hash,
        phone: phone.numberOfPhone,
        address: address.address,
        blood: bloodType
      })
    } else {
      res.status(400).json({
        "status": "error",
        "message": "gagal menyimpan pengguna"
      })
    }

  })

  router.post('/login', async (req: Request, res: Response) => {
    try {
      const getUser = await User.findOne({ email: req.body.email })
      const userPassword = getUser?.password
      const userEmail = getUser?.email

      const reqPassword = req.body.password
      const verifyPassword: Password = new Password('', userPassword)
      const result = await verifyPassword.verify(String(reqPassword))

      if (!userEmail) return res.status(400).json({
        status: res.statusCode,
        message: "Email Anda Salah"
      })

      if (!result) return res.status(400).json({
        status: res.statusCode,
        message: "Password Anda Salah"
      })

      const accessToken = jwt.sign({ email: userEmail }, String(process.env.ACCESS_TOKEN), { expiresIn: '30s' })
      const refreshToken = jwt.sign({ email: userEmail }, String(process.env.REFRESH_TOKEN), { expiresIn: '1d' })

      const userUpdate: Mongo = new Mongo()
      userUpdate.update({ userEmail }, { refresh_token: refreshToken })

      res.header('accessToken', accessToken)
      res.json({ accessToken, refreshToken })





    } catch (error) {
      res.json({ ['login error message']: error }).status(404)
    }
  })


  router.delete('/logout', async (req: Request, res: Response) => {
    try {

      const refreshToken = req.cookies.refreshToken
      if (!refreshToken) return res.sendStatus(204)

      const user = await User.findOne({ refresh_token: refreshToken })
      if (!user) return res.sendStatus(204)

      const userUpdate: Mongo = new Mongo()
      userUpdate.update({ refresh_token: user.refresh_token }, { refresh_token: null })

      res.clearCookie('refreshToken')
      return res.sendStatus(200)

    } catch (error) {
      res.sendStatus(400)
    }
  })


  router.put('/update/:id', async (req: Request, res: Response) => {
    const eventUpdate: Mongo = new Mongo()
    const { id } = req.params
    const { phone, address } = req.body
    try {
      eventUpdate.update({ _id: new ObjectId(id) }, { phone, address })
      res.json({ message: "update data success" })
    } catch (error) {
      res.send("gagal update")
    }
  })


  router.get('/', async (req: Request, res: Response) => {
    try {
      const user = await new Mongo()
      const data = await user.list()
      res.json({
        dataDonor: data
      })
    } catch (error) {
      res.json({ ['login error message']: error })

    }
  })


  router.post('/donor', Authorization, async (req: Request, res: Response) => {
    const userItem: Array<string | object | void> = []
    try {

      const userBloodSelect = await User.find({ bloodType: req.body.bloodType })
      userItem.push(...userBloodSelect)
      res.send(userItem)

      if (userItem.length == 0) {
        res.status(400)
      }
    } catch (error) {
      res.json({ ['table error message']: error })

    }
  })

  router.post('/token', async (req: Request, res: Response) => {
    try {
      const refreshToken = req.body.refreshToken
      if (!refreshToken) return res.sendStatus(401)

      const user = await User.findOne({ refresh_token: refreshToken })
      if (!user) return res.sendStatus(403)

      jwt.verify(refreshToken, String(process.env.REFRESH_TOKEN), (err: any, decoded: any) => {
        if (err) return res.sendStatus(403)

        const accessToken = jwt.sign({ email: user.email }, String(process.env.ACCESS_TOKEN), {
          expiresIn: '30s'
        })

        res.json({ accessToken })
      })




    } catch (error) {
      console.error(error)
    }
  })


  return router

}

