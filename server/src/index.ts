require('dotenv').config()

import { Router as ExpressRouter } from "express";
import Donor from "./entity/Donor";
import Server from "./delivery/http/Server";
import Router from "./delivery/http/Router";
import Handler from "./delivery/http/Handler";
import Repository from "./repository/Repository";
import Model from "./repository/Model";
import Mongo from "./repository/Mongo";

const repository: Repository = new Mongo()
const server: Server = new Server(Number(process.env.PORT), Router(Handler(repository)))
console.log(server.run())


// TODO : next step, coba sinkronkan Repository dan method Handler