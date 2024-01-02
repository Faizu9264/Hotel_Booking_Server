// src/adapter/express/routes/bookingRoutes.ts
import express from 'express';
import { createBookingController,  getBookingsByUserController } from '../controllers/bookingController';


import { tokenValidationMiddleware } from '../middleware/tokenValidationMiddleware';
const router = express.Router();
router.use(tokenValidationMiddleware);
router.post('/create', createBookingController);
router.get('/:userId', getBookingsByUserController);



export default router;
