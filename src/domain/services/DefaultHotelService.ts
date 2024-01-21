// src/domain/services/DefaultHotelService.ts
import { inject, injectable } from "inversify";
import { HotelRepository } from "../../infrastructure/database/repositories/HotelRepository";
import { HotelService } from "./HotelService";
import { Hotel } from "../entities/Hotel";
import { Review } from "../entities/Review";
@injectable()
export class DefaultHotelService implements HotelService {
  constructor(
    @inject("HotelRepository") private readonly hotelRepository: HotelRepository
  ) {}

  async createHotel(hotel: Hotel): Promise<Hotel> {
    return this.hotelRepository.createHotel(hotel);
  }

  async getAllHotels(): Promise<Hotel[]> {
    return this.hotelRepository.getAllHotels();
  }

  async updateHotel(
    hotelId: string,
    updatedDetails: Partial<Hotel>
  ): Promise<Hotel | null> {
    return this.hotelRepository.updateHotel(hotelId, updatedDetails);
  }

  async addReview(hotelId: string, review: Review): Promise<Hotel | null> {
    return this.hotelRepository.addReview(hotelId, review);
  }
  async getAllReviews(): Promise<{ hotelId: string; reviews: Review[] }[]> {
    return this.hotelRepository.getAllReviews();
  }
}
