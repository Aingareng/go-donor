import jwt from 'jsonwebtoken'
import User from "../../repository/Model";
import dotenv from "dotenv"
dotenv.config()
import express from "express"



export default async (req: any, res: any) => {
  try {
    const refresh = req.headers.refreshToken
    if (!refresh) return res.status

    const user = await User.findOne({ refresh_token: refresh })
    if (!user) return res.status

    const email = user.email
    jwt.verify(refresh, String(process.env.REFRESH_TOKEN), (err: any, decoded: any) => {
      if (err) return res.status

      const access_token = jwt.sign({ email: email }, String(process.env.ACCESS_TOKEN), {
        expiresIn: '30s'
      })

      res.json(access_token)
    })


  } catch (error) {

  }
}