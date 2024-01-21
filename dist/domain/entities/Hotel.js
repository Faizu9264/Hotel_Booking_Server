"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
class Hotel {
    constructor(_id, location, details, images, reviews) {
        this._id = _id;
        this.location = location;
        this.details = details;
        this.images = images;
        this.reviews = reviews;
    }
}
exports.Hotel = Hotel;
