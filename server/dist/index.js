"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const Server_1 = __importDefault(require("./delivery/http/Server"));
const Router_1 = __importDefault(require("./delivery/http/Router"));
const Handler_1 = __importDefault(require("./delivery/http/Handler"));
const Mongo_1 = __importDefault(require("./repository/Mongo"));
const repository = new Mongo_1.default();
const server = new Server_1.default(Number(process.env.PORT), (0, Router_1.default)((0, Handler_1.default)(repository)));
console.log(server.run());
// TODO : next step, coba sinkronkan Repository dan method Handler
