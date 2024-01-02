// src/domain/services/BookingService.ts
import { Booking } from '../entities/Booking';

export interface BookingService {
  createBooking(booking: Booking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
  getBookingsByUserId(userId: string): Promise<Booking[]>;
  getBookingById(bookingId: string): Promise<Booking | null>;
  updateBooking(booking: Booking): Promise<void>;
}
