"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require('dotenv').config()
const process_1 = require("process");
console.log(process_1.env.DATABASE);
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor(router) {
        this._router = router;
    }
    run(port) {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use('/user', this._router);
        app.listen(port, () => console.log(`The HTTP server is running on port ${port}.`));
    }
}
exports.default = Server;
