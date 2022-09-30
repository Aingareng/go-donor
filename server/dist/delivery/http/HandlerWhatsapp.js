"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
exports.default = (number) => {
    const client = new whatsapp_web_js_1.Client({
        // authStrategy: new LocalAuth(),
        puppeteer: { headless: true }
    });
    client.initialize();
    client.on('loading_screen', (percent, message) => {
        console.log('LOADING SCREEN', percent, message);
    });
    client.on('qr', (qr) => {
        // NOTE: This event will not be fired if a session is specified.
        // console.log('QR RECEIVED', qr);
        qrcode_terminal_1.default.generate(qr, { small: true });
    });
    client.on('authenticated', () => {
        console.log('AUTHENTICATED');
    });
    client.on('auth_failure', (msg) => {
        // Fired if session restore was unsuccessful
        console.error('AUTHENTICATION FAILURE', msg);
    });
    client.on('ready', () => {
        console.log('READY');
    });
    const setNumber = number + '@c.us';
    const message = `Halo saya butuh darah anda`;
    client.sendMessage(setNumber, message)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    // const result = setNumber
    // return result
};
