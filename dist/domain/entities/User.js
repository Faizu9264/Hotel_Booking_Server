"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/domain/entities/User.ts
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    _id: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    phoneNumber: { type: String },
    role: { type: String, required: true, default: 'user' },
    blocked: { type: Boolean, default: false },
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
