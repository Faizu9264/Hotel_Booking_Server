// src/usecase/RoomUseCase.ts
import { inject, injectable } from "inversify";
import { RoomService } from "../domain/services/RoomService";
import { Room } from "../domain/entities/Room";

@injectable()
export class RoomUseCase {
  constructor(
    @inject("RoomService") private readonly roomService: RoomService
  ) {}

  async createRoom(room: Room): Promise<Room> {
    return this.roomService.createRoom(room);
  }

  async getRoomById(roomId: string): Promise<Room | null> {
    return this.roomService.getRoomById(roomId);
  }

  async getAllRooms(): Promise<Room[]> {
    return this.roomService.getAllRooms();
  }

  async updateRoom(
    roomId: string,
    updatedDetails: Partial<Room>
  ): Promise<Room | null> {
    return this.roomService.updateRoom(roomId, updatedDetails);
  }

  async getRoomsByHotelId(hotelId: string): Promise<Room[]> {
    return this.roomService.getRoomsByHotelId(hotelId);
  }
}
