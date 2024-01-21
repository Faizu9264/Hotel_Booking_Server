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
// src/infrastructure/database/models/hotelModel.ts
const mongoose_1 = __importStar(require("mongoose"));
const reviewSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    reviewText: { type: String, required: true },
    date: { type: Date, default: Date.now },
});
const hotelSchema = new mongoose_1.Schema({
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    details: {
        hotelName: { type: String, required: true },
        minRent: { type: Number, required: true },
        location: { type: String, required: true },
        contactNo: { type: String, required: true },
        emailAddress: { type: String, required: true },
        description: { type: String, required: true },
    },
    images: { type: [String], default: [] },
    reviews: { type: [reviewSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model("Hotel", hotelSchema);
