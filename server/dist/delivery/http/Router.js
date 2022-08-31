"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.default = (handler) => {
    const router = (0, express_1.Router)();
    router.use('/user', handler);
    return router;
};
