// src/infrastructure/database/repositories/RoomRepository.ts
import { Model, Document } from 'mongoose';
import { Room } from '../../../domain/entities/Room';

export class RoomRepository {
  private readonly roomModel: Model<Document & Room>;

  constructor(roomModel: Model<Document & Room>) {
    this.roomModel = roomModel;
  }

  async createRoom(room: Room): Promise<Room> {
    const createdRoom = await this.roomModel.create(room);
    return createdRoom.toObject() as Room;
  }

  async getRoomById(roomId: string): Promise<Room | null> {
    const room = await this.roomModel.findById(roomId).lean().exec();
    return room as Room | null;
  }

  async getAllRooms(): Promise<Room[]> {
    const allRooms = await this.roomModel.find().sort({ createdAt: -1 }).lean().exec();
    return allRooms as Room[];
  }

  async updateRoom(roomId: string, updatedDetails: Partial<Room>): Promise<Room | null> {
    try {
      console.log('Updated Details Before Update:', updatedDetails);
      
      const updatedRoom = await this.roomModel
        .findByIdAndUpdate(roomId, { $set: updatedDetails }, { new: true })
        .lean()
        .exec();
  
      console.log('Updated Room:', updatedRoom);
  
      return updatedRoom as Room | null;
    } catch (error) {
      console.error('Error updating room:', error);
      return null;
    }
  }
  
  

  async getRoomsByHotelId(hotelId: string): Promise<Room[]> {
    const rooms = await this.roomModel.find({ hotelId }).lean().exec();
    return rooms as Room[];
  }
}

