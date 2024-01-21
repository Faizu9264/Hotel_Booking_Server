"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
// src/infrastructure/config.ts
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = () => {
    const uri = process.env.MONGODB_URI;
    mongoose_1.default
        .connect(uri)
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => console.error("Error connecting to MongoDB:", error));
};
exports.connectToDatabase = connectToDatabase;
