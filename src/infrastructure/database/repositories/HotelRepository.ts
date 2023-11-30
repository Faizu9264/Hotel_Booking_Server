// src/infrastructure/database/repositories/HotelRepository.ts
import { Model, Document } from 'mongoose';
import { Hotel } from '../../../domain/entities/Hotel';

export class HotelRepository {
  private readonly hotelModel: Model<Document & Hotel>;

  constructor(hotelModel: Model<Document & Hotel>) {
    this.hotelModel = hotelModel;
  }

  async createHotel(hotel: Hotel): Promise<Hotel> {
    const createdHotel = await this.hotelModel.create(hotel);
    return createdHotel.toObject() as Hotel;
  }

  async getAllHotels(): Promise<Hotel[]> {
    const allHotels = await this.hotelModel.find().lean().exec();
    return allHotels as Hotel[];
  }
}
