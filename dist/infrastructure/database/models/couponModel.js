"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/database/models/couponModel.ts
const mongoose_1 = __importStar(require("mongoose"));
const couponSchema = new mongoose_1.Schema({
    code: { type: String, required: true },
    discountType: { type: String, required: true },
    discountAmount: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    maxDiscount: { type: Number, required: true },
    minCart: { type: Number, required: true },
    expiryDate: { type: String, required: true },
    description: { type: String, required: true },
    couponCount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    isApplied: { type: Boolean, default: true },
});
const CouponModel = mongoose_1.default.model("Coupon", couponSchema);
exports.default = CouponModel;
