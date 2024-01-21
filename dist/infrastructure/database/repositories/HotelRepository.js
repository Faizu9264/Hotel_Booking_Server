"use strict";
// src/infrastructure/database/repositories/HotelRepository.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRepository = void 0;
const userRepository_1 = __importDefault(require("./userRepository"));
class HotelRepository {
    constructor(hotelModel) {
        this.hotelModel = hotelModel;
    }
    createHotel(hotel) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdHotel = yield this.hotelModel.create(hotel);
            return createdHotel.toObject();
        });
    }
    getAllHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            const allHotels = yield this.hotelModel
                .find()
                .sort({ createdAt: -1 })
                .lean()
                .exec();
            return allHotels;
        });
    }
    updateHotel(hotelId, updatedDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof updatedDetails.images === "string") {
                updatedDetails.images = JSON.parse(updatedDetails.images);
            }
            const updatedHotel = yield this.hotelModel
                .findByIdAndUpdate(hotelId, { $set: updatedDetails }, { new: true })
                .lean()
                .exec();
            return updatedHotel;
        });
    }
    addReview(hotelId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingHotel = yield this.hotelModel.findById(hotelId).lean().exec();
            if (!existingHotel) {
                return null;
            }
            if (!Array.isArray(existingHotel.reviews)) {
                existingHotel.reviews = [];
            }
            const existingReviewIndex = existingHotel.reviews.findIndex((existingReview) => existingReview.userId === review.userId);
            if (existingReviewIndex !== -1) {
                const updatedHotel = yield this.hotelModel
                    .findOneAndUpdate({ _id: hotelId, "reviews.userId": review.userId }, {
                    $set: {
                        "reviews.$.rating": review.rating,
                        "reviews.$.comment": review.comment,
                        "reviews.$.reviewText": review.reviewText,
                        "reviews.$.date": review.date,
                    },
                }, { new: true })
                    .lean()
                    .exec();
                return updatedHotel;
            }
            else {
                const updatedHotel = yield this.hotelModel
                    .findByIdAndUpdate(hotelId, { $push: { reviews: review } }, { new: true })
                    .lean()
                    .exec();
                return updatedHotel;
            }
        });
    }
    getAllReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allHotels = yield this.hotelModel.find().lean().exec();
                const allReviews = yield Promise.all(allHotels.map((hotel) => __awaiter(this, void 0, void 0, function* () {
                    const hotelId = hotel._id.toString();
                    const hotelReviews = Array.isArray(hotel.reviews)
                        ? yield Promise.all(hotel.reviews.map((review) => __awaiter(this, void 0, void 0, function* () {
                            const user = yield userRepository_1.default.findOne({
                                _id: review.userId,
                            });
                            return {
                                userId: review.userId,
                                username: user ? user.username : "",
                                profileImage: user === null || user === void 0 ? void 0 : user.profileImage,
                                rating: review.rating,
                                comment: review.comment,
                                reviewText: review.reviewText,
                                date: review.date,
                            };
                        })))
                        : [];
                    return {
                        hotelId,
                        reviews: hotelReviews,
                    };
                })));
                return allReviews;
            }
            catch (error) {
                console.error("Error getting reviews:", error);
                throw error;
            }
        });
    }
}
exports.HotelRepository = HotelRepository;
