// src/adapter/express/controllers/hotelController.ts
import { Request, Response } from 'express';
import { HotelUseCase } from '../../../usecase/HotelUseCase';
import { HotelRepository } from '../../../infrastructure/database/repositories/HotelRepository';
import { Hotel } from '../../../domain/entities/Hotel';
import hotelModel from '../../../infrastructure/database/models/hotelModel';

const hotelRepository = new HotelRepository(hotelModel);
const hotelUseCase = new HotelUseCase(hotelRepository);

export const createHotelController = async (req: Request, res: Response): Promise<void> => {
  try {
    const hotelDetails = req.body;
    const createdHotel = await hotelUseCase.createHotel(hotelDetails as Hotel);
    console.log(createdHotel);
    
    res.status(201).json(createdHotel);
  } catch (error) {
    console.error('Error creating hotel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllHotelsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allHotels = await hotelUseCase.getAllHotels();
    res.status(200).json(allHotels);
  } catch (error) {
    console.error('Error getting hotels:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
