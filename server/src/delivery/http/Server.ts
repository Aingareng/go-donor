// require('dotenv').config()
import { env } from 'process'


import express, { Express, Router } from 'express'
import cors from "cors";
import mongoose from 'mongoose';

class Server {
  private _uri: string
  private _router: Router

  constructor(port: number, router: Router) {
    this._uri = "mongodb://127.0.0.1:27017/go_donor"
    this._router = router
  }

  public run(port: number) {
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
    app.use(express.json())
    app.use('/user', this._router)
    app.listen(port, () => console.log(`The HTTP server is running on port ${port}.`))
  }
}

export default Server