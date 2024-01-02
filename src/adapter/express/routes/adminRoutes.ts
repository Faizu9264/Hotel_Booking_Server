// src/adapter/express/routes/adminRoutes.ts
import express from 'express';
import {
  adminLoginController,
  getAllUsersController,
  editUserController,
  blockUserController,
  unblockUserController,
} from '../controllers/adminController';
import {getAllBookingsController,cancelBookingController,
  approveBookingController} from '../controllers/bookingController'
  import { tokenValidationMiddleware } from '../middleware/tokenValidationMiddleware';

const router = express.Router();

router.post('/login', adminLoginController);
router.use(tokenValidationMiddleware);
router.get('/users', getAllUsersController);
router.patch('/user/edit/:userId', editUserController);
router.patch('/user/block/:userId', blockUserController);
router.patch('/user/unblock/:userId', unblockUserController);
router.get('/allBookings',getAllBookingsController );
router.patch('/cancel/:bookingId', cancelBookingController); 
router.patch('/approve/:bookingId', approveBookingController); 
export default router;
