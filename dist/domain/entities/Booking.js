"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
class Booking extends mongoose_1.Document {
    constructor(_id, guestName, email, phone, specialRequests, checkInDate, checkOutDate, adultCount, childrenCount, roomCount, nightCount, maxPeople, total, discountPrice, paymentStatus, RoomId, HotelId, BookingStatus, userId, couponId, paymentMethod, wallet) {
        super();
        this._id = _id;
        this.guestName = guestName;
        this.email = email;
        this.phone = phone;
        this.specialRequests = specialRequests;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.adultCount = adultCount;
        this.childrenCount = childrenCount;
        this.roomCount = roomCount;
        this.nightCount = nightCount;
        this.maxPeople = maxPeople;
        this.total = total;
        this.discountPrice = discountPrice;
        this.paymentStatus = paymentStatus;
        this.RoomId = RoomId;
        this.HotelId = HotelId;
        this.BookingStatus = BookingStatus;
        this.userId = userId;
        this.couponId = couponId;
        this.paymentMethod = paymentMethod;
        this.wallet = wallet;
    }
}
exports.Booking = Booking;
