// src/domain/entities/Room.ts
export class Room {
  constructor(
    public roomType: string,
    public hotelName: string,
    public hotelId: string,
    public amenities: string[],
    public rentAmount: number,
    public discountPrice: number,
    public roomsCount: number,
    public maxPeople: number,
    public description: string,
    public images: string[]
  ) {}
}
