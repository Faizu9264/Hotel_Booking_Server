// src/domain/entities/Review.ts

export class Review {
  constructor(
    public userId: string,
    public rating: number,
    public comment: string,
    public reviewText: string,
    public hotelId: string,
    public date: Date
  ) {}
}
