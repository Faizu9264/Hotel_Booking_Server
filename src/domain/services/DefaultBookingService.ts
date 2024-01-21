// src/domain/services/DefaultBookingService.ts
import { inject, injectable } from "inversify";
import { BookingRepository } from "../../infrastructure/database/repositories/BookingRepository";
import { BookingService } from "./BookingService";
import { Booking } from "../entities/Booking";

@injectable()
export class DefaultBookingService implements BookingService {
  constructor(
    @inject("BookingRepository")
    private readonly bookingRepository: BookingRepository
  ) {}

  async createBooking(bookingDetails: Booking): Promise<Booking> {
    return this.bookingRepository.createBooking(bookingDetails);
  }

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingRepository.getAllBookings();
  }
  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    return this.bookingRepository.getBookingsByUserId(userId);
  }

  async getBookingById(bookingId: string): Promise<Booking | null> {
    return this.bookingRepository.getBookingById(bookingId);
  }

  async updateBooking(booking: Booking): Promise<void> {
    return this.bookingRepository.updateBooking(booking);
  }
}
