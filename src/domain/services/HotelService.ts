// src/domain/services/HotelService.ts
import { Hotel } from '../entities/Hotel';

export interface HotelService {
  createHotel(hotel: Hotel): Promise<Hotel>;
  getAllHotels(): Promise<Hotel[]>;
}
