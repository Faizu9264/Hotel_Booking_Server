"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
// src/domain/entities/Room.ts
class Room {
    constructor(roomType, hotelName, hotelId, amenities, rentAmount, discountPrice, roomsCount, maxPeople, description, images) {
        this.roomType = roomType;
        this.hotelName = hotelName;
        this.hotelId = hotelId;
        this.amenities = amenities;
        this.rentAmount = rentAmount;
        this.discountPrice = discountPrice;
        this.roomsCount = roomsCount;
        this.maxPeople = maxPeople;
        this.description = description;
        this.images = images;
    }
}
exports.Room = Room;
