"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/database/models/userModel.ts
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
