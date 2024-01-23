"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
require("reflect-metadata");
const app_1 = __importDefault(require("./adapter/express/app"));
const config_1 = require("./infrastructure/config");
require("dotenv").config();
(0, config_1.connectToDatabase)();
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => {
    console.log(`Server is running on ${process.env.USER_DOMAIN}:${PORT}`);
});
