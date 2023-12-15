// src/adapter/express/controllers/roomController.ts
import { Request, Response } from 'express';
import { RoomUseCase } from '../../../usecase/RoomUseCase';
import { RoomRepository } from '../../../infrastructure/database/repositories/RoomRepository';
import roomModel from '../../../infrastructure/database/models/roomModel';
import { Room } from '../../../domain/entities/Room';

const roomRepository = new RoomRepository(roomModel)
const roomUseCase = new RoomUseCase(roomRepository );

export const createRoomController = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const  roomDetails = req.body.roomDetails; 
 

    const createdRoom = await roomUseCase.createRoom(roomDetails as Room);
    res.status(201).json(createdRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getRoomByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.params;
    const room = await roomUseCase.getRoomById(roomId);

    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    console.error('Error getting room by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllRoomsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allRooms = await roomUseCase.getAllRooms();
    res.status(200).json(allRooms);
  } catch (error) {
    console.error('Error getting all rooms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateRoomController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.params;
    const { roomDetails, images } = req.body;

    const updatedRoom = await roomUseCase.updateRoom(roomId, {
      roomType: roomDetails.roomType,
      hotelName: roomDetails.hotelName,
      amenities: roomDetails.amenities,
      rentAmount: roomDetails.rentAmount,
      discountPrice: roomDetails.discountPrice,
      roomsCount: roomDetails.roomsCount,
      maxPeople: roomDetails.maxPeople,
      description: roomDetails.description,
      images: images ? images.flat() : [],
    });

    if (updatedRoom) {
      res.status(200).json(updatedRoom);
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getRoomsByHotelIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { hotelId } = req.params;
    const rooms = await roomUseCase.getRoomsByHotelId(hotelId);

    if (rooms.length > 0) {
      res.status(200).json(rooms);
    } else {
      res.status(404).json({ error: 'No rooms found for the given hotelId' });
    }
  } catch (error) {
    console.error('Error getting rooms by hotelId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};