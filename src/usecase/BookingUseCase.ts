// src/usecase/BookingUseCase.ts
import { inject, injectable } from 'inversify';
import { BookingService } from '../domain/services/BookingService';
import { Booking } from '../domain/entities/Booking';

@injectable()
export class BookingUseCase {
  constructor(@inject('BookingService') private readonly bookingService: BookingService) {}

  async createBooking(booking: Booking): Promise<Booking> {
    return this.bookingService.createBooking(booking);
  }

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingService.getAllBookings();
  }
  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    return this.bookingService.getBookingsByUserId(userId);
  }
  

  async getBookingById(bookingId: string): Promise<Booking | null> {
    return this.bookingService.getBookingById(bookingId);
  }

  async updateBooking(booking: Booking): Promise<void> {
    return this.bookingService.updateBooking(booking);
  }
}
