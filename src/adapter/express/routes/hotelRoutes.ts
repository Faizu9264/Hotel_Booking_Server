// src/adapter/express/routes/hotelRoutes.ts
import express from 'express';
import { createHotelController, getAllHotelsController } from '../controllers/hotelController';

const router = express.Router();

router.post('/create', createHotelController);
router.get('/all', getAllHotelsController);

export default router;
