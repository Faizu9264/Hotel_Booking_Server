// src/adapter/express/controllers/hotelController.ts
import { Request, Response } from "express";
import { HotelUseCase } from "../../../usecase/HotelUseCase";
import { HotelRepository } from "../../../infrastructure/database/repositories/HotelRepository";
import { Hotel } from "../../../domain/entities/Hotel";
import hotelModel from "../../../infrastructure/database/models/hotelModel";
import { Review } from "../../../domain/entities/Review";

const hotelRepository = new HotelRepository(hotelModel);
const hotelUseCase = new HotelUseCase(hotelRepository);

export const createHotelController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hotelDetails = req.body;
    console.log("hotelDetail", hotelDetails);

    const createdHotel = await hotelUseCase.createHotel(hotelDetails as Hotel);

    res.status(201).json(createdHotel);
  } catch (error) {
    console.error("Error creating hotel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllHotelsController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const allHotels = await hotelUseCase.getAllHotels();
    res.status(200).json(allHotels);
  } catch (error) {
    console.error("Error getting hotels:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateHotelController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { hotelId } = req.params;
    const updatedDetails = req.body;

    const updatedHotel = await hotelUseCase.updateHotel(hotelId, {
      location: updatedDetails.location,
      details: updatedDetails.details,
      images: updatedDetails.images.flat(),
    });
    if (updatedHotel) {
      res.status(200).json(updatedHotel);
    } else {
      res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addReviewController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { hotelId } = req.params;
    const reviewDetails = req.body;
    console.log("reviewDetails", reviewDetails);

    const review = new Review(
      reviewDetails.userId,
      reviewDetails.rating,
      reviewDetails.comment,
      reviewDetails.reviewText,
      hotelId,
      new Date()
    );

    const updatedHotel = await hotelUseCase.addReview(hotelId, review);

    if (updatedHotel) {
      res.status(200).json(updatedHotel);
    } else {
      res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllReviewsController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const allReviews = await hotelUseCase.getAllReviews();
    res.status(200).json(allReviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
