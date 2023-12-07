// src/adapter/express/routes/hotelRoutes.ts
import express from 'express';
import { createHotelController, getAllHotelsController, updateHotelController } from '../controllers/hotelController';

const router = express.Router();

router.patch('/update/:hotelId', updateHotelController);
router.post('/create', createHotelController);
router.get('/all', getAllHotelsController);

export default router;
