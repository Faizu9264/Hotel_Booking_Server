"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const walletTransactionSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    date: { type: Date, default: Date.now },
});
const userSchema = new mongoose_1.Schema({
    _id: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    phoneNumber: { type: String },
    wallet: { type: Number, default: 0 },
    role: { type: String, required: true, default: "user" },
    blocked: { type: Boolean, default: false },
    walletTransactions: { type: [walletTransactionSchema], default: [] },
});
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
