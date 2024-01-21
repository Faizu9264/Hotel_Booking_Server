// src/domain/entities/Hotel.ts
import { Review } from "./Review";
export class Hotel {
  constructor(
    public _id: string,
    public location: { lat: number; lng: number },
    public details: {
      hotelName: string;
      minRent: number;
      location: string;
      contactNo: string;
      emailAddress: string;
      description: string;
    },
    public images: string[],
    public reviews: Review[]
  ) {}
}
