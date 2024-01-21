// src/infrastructure/database/models/bookingModel.ts
import mongoose, { Schema, Document } from "mongoose";
import { Booking } from "../../../domain/entities/Booking";

const bookingSchema = new Schema({
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

export default mongoose.model<Document & Booking>("Booking", bookingSchema);
