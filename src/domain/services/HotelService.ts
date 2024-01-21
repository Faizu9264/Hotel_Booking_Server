// src/domain/services/HotelService.ts
import { Hotel } from "../entities/Hotel";
import { Review } from "../entities/Review";

export interface HotelService {
  createHotel(hotel: Hotel): Promise<Hotel>;
  getAllHotels(): Promise<Hotel[]>;
  updateHotel(
    hotelId: string,
    updatedDetails: Partial<Hotel>
  ): Promise<Hotel | null>;
  addReview(hotelId: string, review: Review): Promise<Hotel | null>;
  getAllReviews(): Promise<{ hotelId: string; reviews: Review[] }[]>;
}
