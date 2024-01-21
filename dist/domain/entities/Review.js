"use strict";
// src/domain/entities/Review.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
class Review {
    constructor(userId, rating, comment, reviewText, hotelId, date) {
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
        this.reviewText = reviewText;
        this.hotelId = hotelId;
        this.date = date;
    }
}
exports.Review = Review;
