// src/infrastructure/database/repositories/BookingRepository.ts
import { Model, Document } from "mongoose";
import { Booking } from "../../../domain/entities/Booking";
import bookingModel from "../models/bookingModel";

export class BookingRepository {
  private readonly bookingModel: Model<Document & Booking>;

  constructor() {
    this.bookingModel = bookingModel;
  }

  async createBooking(bookingDetails: Booking): Promise<Booking> {
    const createdBooking = await this.bookingModel.create(bookingDetails);
    return createdBooking.toObject() as Booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    const allBookings = await this.bookingModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: "RoomId",
        model: "Room",
      })
      .lean()
      .exec();

    return allBookings as Booking[];
  }
  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    const userBookings = await this.bookingModel
      .find({ userId })
      .populate({
        path: "RoomId",
        model: "Room",
      })
      .lean()
      .exec();

    return userBookings as Booking[];
  }
  async getBookingById(bookingId: string): Promise<Booking | null> {
    return this.bookingModel.findById(bookingId).lean().exec();
  }

  async updateBooking(booking: Booking): Promise<void> {
    await this.bookingModel.findByIdAndUpdate(booking._id, booking).exec();
  }
}
