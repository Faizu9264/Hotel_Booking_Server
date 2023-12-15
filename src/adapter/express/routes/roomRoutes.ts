// src/adapter/express/routes/roomRoutes.ts
import express from 'express';
import {
  createRoomController,
  getRoomByIdController,
  getAllRoomsController,
  updateRoomController,
  getRoomsByHotelIdController
} from '../controllers/roomController';
import { tokenValidationMiddleware } from '../middleware/tokenValidationMiddleware';

const router = express.Router();
router.use(tokenValidationMiddleware);
router.post('/create', createRoomController);
router.get('/get/:roomId', getRoomByIdController);
router.get('/all', getAllRoomsController);
router.patch('/update/:roomId', updateRoomController);
router.get('/by-hotel/:hotelId', getRoomsByHotelIdController); 

export default router;
