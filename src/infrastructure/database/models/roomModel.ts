// src/infrastructure/database/models/roomModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Room } from '../../../domain/entities/Room';

const roomSchema = new Schema({
  roomType: { type: String, required: true },
  hotelName: { type: String, required: true },
  hotelId: { type: String, required: true },
  amenities: { type: [String], default: [] },
  rentAmount: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  roomsCount: { type: Number, required: true },
  maxPeople: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Document & Room>('Room', roomSchema);
