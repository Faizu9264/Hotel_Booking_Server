// src/infrastructure/database/models/hotelModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Hotel } from '../../../domain/entities/Hotel';

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
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Document & Hotel>('Hotel', hotelSchema);
