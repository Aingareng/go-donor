import { Router as ExpressRouter } from "express";
import Donor from "./entity/Donor";
import Server from "./delivery/http/Server";
import Router from "./delivery/http/Router";
import Handler from "./delivery/http/Handler";
import Repository from "./repository/Repository";
import Mongo from "./repository/Mongo";


// const server: Server = new Server(8080,Router(Handler(Repository)))

// server.run(8080)