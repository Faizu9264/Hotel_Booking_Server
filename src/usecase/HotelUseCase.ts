// src/usecase/HotelUseCase.ts
import { inject, injectable } from 'inversify';
import { HotelService } from '../domain/services/HotelService';
import { Hotel } from '../domain/entities/Hotel';

@injectable()
export class HotelUseCase {
  constructor(@inject('HotelService') private readonly hotelService: HotelService) {}

  async createHotel(hotel: Hotel): Promise<Hotel> {
    return this.hotelService.createHotel(hotel);
  }

  async getAllHotels(): Promise<Hotel[]> {
    return this.hotelService.getAllHotels();
  }
}
