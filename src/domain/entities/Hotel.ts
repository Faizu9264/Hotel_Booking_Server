// src/domain/entities/Hotel.ts
export class Hotel {
    constructor(
      public location: { lat: number; lng: number },
      public details: {
        hotelName: string;
        minRent: number;
        location: string;
        contactNo: string;
        emailAddress: string;
        description: string;
      },
      public images: string[]
    ) {}
  }
  