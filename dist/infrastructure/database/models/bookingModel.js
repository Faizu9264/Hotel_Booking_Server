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
// src/infrastructure/database/models/bookingModel.ts
const mongoose_1 = __importStar(require("mongoose"));
const bookingSchema = new mongoose_1.Schema({
    guestName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    specialRequests: { type: String, default: "" },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    adultCount: { type: Number, required: true },
    childrenCount: { type: Number, default: 0 },
    roomCount: { type: Number, required: true },
    nightCount: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    total: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    paymentStatus: { type: String, default: "pending" },
    paymentMethod: { type: String },
    wallet: { type: Number },
    BookingStatus: { type: String, default: "pending" },
    RoomId: { type: String, required: true },
    HotelId: { type: String, required: true },
    userId: { type: String, required: true },
    couponId: { type: String },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model("Booking", bookingSchema);
