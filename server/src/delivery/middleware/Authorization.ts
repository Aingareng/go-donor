import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { NextFunction, raw, Request, Response } from 'express'

export default (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, String(process.env.ACCESS_TOKEN), (err: any, decoded: any) => {
      if (err) return res.status(403).json({ message: "Silahkan login terlebih dahulu" })
      req.email = decoded.email
      next()
    })

  } catch (error) {
    console.error(error)

    res.status(403).json({
      status: 'error',
      message: 'failed to verify the token'
    }).end();
  }
}
