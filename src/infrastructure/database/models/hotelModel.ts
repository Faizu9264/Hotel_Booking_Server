// src/infrastructure/database/models/hotelModel.ts
import mongoose, { Schema, Document } from "mongoose";
import { Hotel } from "../../../domain/entities/Hotel";

const reviewSchema = new Schema({
  userId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  reviewText: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const hotelSchema = new Schema({
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

export default mongoose.model<Document & Hotel>("Hotel", hotelSchema);
