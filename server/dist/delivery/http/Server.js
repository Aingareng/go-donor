"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class Server {
    constructor(port, router) {
        this._uri = String(process.env.DATABASE);
        this._port = port;
        this._router = router;
    }
    run() {
        const app = (0, express_1.default)();
        mongoose_1.default.connect(this._uri, (err) => {
            if (err) {
                console.log(`Mongoose message: ${err}`);
            }
            console.log('Mongoose Connect');
        });
        const client = mongoose_1.default.connection;
        client.on('error', (err) => console.log(err));
        client.once('open', () => console.log('database connected!'));
        app.use((0, cors_1.default)());
        app.use((0, cookie_parser_1.default)());
        app.use(express_1.default.json());
        app.use('/user', this._router);
        app.listen(this._port, () => console.log(`The HTTP server is running on port ${this._port}.`));
    }
}
exports.default = Server;
