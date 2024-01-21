import { Document, Types } from "mongoose";

export class Booking extends Document {
  constructor(
    public _id: Types.ObjectId,
    public guestName: string,
    public email: string,
    public phone: string,
    public specialRequests: string,
    public checkInDate: Date,
    public checkOutDate: Date,
    public adultCount: number,
    public childrenCount: number,
    public roomCount: number,
    public nightCount: number,
    public maxPeople: number,
    public total: number,
    public discountPrice: number,
    public paymentStatus: string,
    public RoomId: string,
    public HotelId: string,
    public BookingStatus: string,
    public userId: string,
    public couponId: string,
    public paymentMethod: string,
    public wallet: number
  ) {
    super();
  }
}
