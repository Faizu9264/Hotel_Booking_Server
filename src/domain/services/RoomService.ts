// src/domain/services/RoomService.ts
import { Room } from "../entities/Room";

export interface RoomService {
  createRoom(room: Room): Promise<Room>;
  getRoomById(roomId: string): Promise<Room | null>;
  getAllRooms(): Promise<Room[]>;
  updateRoom(
    roomId: string,
    updatedDetails: Partial<Room>
  ): Promise<Room | null>;
  getRoomsByHotelId(hotelId: string): Promise<Room[]>;
}
