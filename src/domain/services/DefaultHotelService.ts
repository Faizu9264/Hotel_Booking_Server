// src/domain/services/DefaultHotelService.ts
import { inject, injectable } from 'inversify';
import { HotelRepository } from '../../infrastructure/database/repositories/HotelRepository';
import { HotelService } from './HotelService'; 
import { Hotel } from '../entities/Hotel'; 

@injectable()
export class DefaultHotelService implements HotelService {
  constructor(@inject('HotelRepository') private readonly hotelRepository: HotelRepository) {}

  async createHotel(hotel: Hotel): Promise<Hotel> {
    return this.hotelRepository.createHotel(hotel);
  }

  async getAllHotels(): Promise<Hotel[]> {
    return this.hotelRepository.getAllHotels();
  }
}
