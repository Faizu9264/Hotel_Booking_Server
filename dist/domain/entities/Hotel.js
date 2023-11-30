"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
// src/domain/entities/Hotel.ts
class Hotel {
    constructor(location, details, images) {
        this.location = location;
        this.details = details;
        this.images = images;
    }
}
exports.Hotel = Hotel;
