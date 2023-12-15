// src/domain/services/DefaultRoomService.ts
import { inject, injectable } from 'inversify';
import { RoomRepository } from '../../infrastructure/database/repositories/RoomRepository';
import { RoomService } from './RoomService';
import { Room } from '../entities/Room';

@injectable()
export class DefaultRoomService implements RoomService {
  constructor(@inject('RoomRepository') private readonly roomRepository: RoomRepository) {}

  async createRoom(room: Room): Promise<Room> {
    return this.roomRepository.createRoom(room);
  }

  async getRoomById(roomId: string): Promise<Room | null> {
    return this.roomRepository.getRoomById(roomId);
  }

  async getAllRooms(): Promise<Room[]> {
    return this.roomRepository.getAllRooms();
  }

  async updateRoom(roomId: string, updatedDetails: Partial<Room>): Promise<Room | null> {
    return this.roomRepository.updateRoom(roomId, updatedDetails);
  }

  async getRoomsByHotelId(hotelId: string): Promise<Room[]> {
    return this.roomRepository.getRoomsByHotelId(hotelId);
  }
}
