// src/infrastructure/database/repositories/HotelRepository.ts

import { Model, Document } from "mongoose";
import { Hotel } from "../../../domain/entities/Hotel";
import { Review } from "../../../domain/entities/Review";
import userRepository from "./userRepository";
export class HotelRepository {
  private readonly hotelModel: Model<Document & Hotel>;

  constructor(hotelModel: Model<Document & Hotel>) {
    this.hotelModel = hotelModel;
  }

  async createHotel(hotel: Hotel): Promise<Hotel> {
    const createdHotel = await this.hotelModel.create(hotel);
    return createdHotel.toObject() as Hotel;
  }

  async getAllHotels(): Promise<Hotel[]> {
    const allHotels = await this.hotelModel
      .find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return allHotels as Hotel[];
  }
  async updateHotel(
    hotelId: string,
    updatedDetails: Partial<Hotel>
  ): Promise<Hotel | null> {
    if (typeof updatedDetails.images === "string") {
      updatedDetails.images = JSON.parse(updatedDetails.images);
    }
    const updatedHotel = await this.hotelModel
      .findByIdAndUpdate(hotelId, { $set: updatedDetails }, { new: true })
      .lean()
      .exec();

    return updatedHotel as Hotel | null;
  }

  async addReview(hotelId: string, review: Review): Promise<Hotel | null> {
    const existingHotel = await this.hotelModel.findById(hotelId).lean().exec();

    if (!existingHotel) {
      return null;
    }

    if (!Array.isArray(existingHotel.reviews)) {
      existingHotel.reviews = [];
    }

    const existingReviewIndex = existingHotel.reviews.findIndex(
      (existingReview: Review) => existingReview.userId === review.userId
    );

    if (existingReviewIndex !== -1) {
      const updatedHotel = await this.hotelModel
        .findOneAndUpdate(
          { _id: hotelId, "reviews.userId": review.userId },
          {
            $set: {
              "reviews.$.rating": review.rating,
              "reviews.$.comment": review.comment,
              "reviews.$.reviewText": review.reviewText,
              "reviews.$.date": review.date,
            },
          },
          { new: true }
        )
        .lean()
        .exec();

      return updatedHotel as Hotel | null;
    } else {
      const updatedHotel = await this.hotelModel
        .findByIdAndUpdate(
          hotelId,
          { $push: { reviews: review } },
          { new: true }
        )
        .lean()
        .exec();

      return updatedHotel as Hotel | null;
    }
  }

  async getAllReviews(): Promise<{ hotelId: string; reviews: Review[] }[]> {
    try {
      const allHotels = await this.hotelModel.find().lean().exec();

      const allReviews: { hotelId: string; reviews: Review[] }[] =
        await Promise.all(
          allHotels.map(async (hotel: any) => {
            const hotelId = hotel._id.toString();
            const hotelReviews = Array.isArray(hotel.reviews)
              ? await Promise.all(
                  hotel.reviews.map(async (review: any) => {
                    const user = await userRepository.findOne({
                      _id: review.userId,
                    });
                    return {
                      userId: review.userId,
                      username: user ? user.username : "",
                      profileImage: user?.profileImage,
                      rating: review.rating,
                      comment: review.comment,
                      reviewText: review.reviewText,
                      date: review.date,
                    };
                  })
                )
              : [];

            return {
              hotelId,
              reviews: hotelReviews,
            };
          })
        );

      return allReviews;
    } catch (error) {
      console.error("Error getting reviews:", error);
      throw error;
    }
  }
}
