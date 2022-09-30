require('dotenv').config()

import express, { Express, Router } from 'express'
import cors from "cors";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";

class Server {
  private _uri: string
  private _port: number
  private _router: Router

  constructor(port: number, router: Router) {
    this._uri = String(process.env.DATABASE)
    this._port = port
    this._router = router
  }

  public run() {
    const app: Express = express()


    mongoose.connect(this._uri, (err: any) => {
      if (err) {
        console.log(`Mongoose message: ${err}`)
      }
      console.log('Mongoose Connect')
    })

    const client = mongoose.connection
    client.on('error', (err) => console.log(err))
    client.once('open', () => console.log('database connected!'))

    app.use(cors())
    app.use(cookieParser())
    app.use(express.json())
    app.use('/user', this._router)
    app.listen(this._port, () => console.log(`The HTTP server is running on port ${this._port}.`))
  }
}

export default Server