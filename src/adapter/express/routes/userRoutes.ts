// src/adapter/express/routes/userRoutes.ts

import express, { Request, Response } from 'express';
import { tokenValidationMiddleware } from '../middleware/tokenValidationMiddleware';
import {
  sendOTPController,
  verifyOTPController,
  completeSignupController,
  loginController,
  googleLoginController,
  resendOTPController,
  updateProfileController,
  changePasswordController,
  checkoutController
} from '../controllers/userController';
import { cancelBookingController} from '../controllers/bookingController'
import { handleWebhookEvent } from '../controllers/bookingController';

const app = express();
app.use(express.static('public'));

const router = express.Router();

router.post('/signup', sendOTPController);
router.post('/verify-otp', verifyOTPController);
router.post('/complete-signup', completeSignupController);
router.post('/login', loginController);
router.post('/google-login', googleLoginController);
router.post('/resend-otp', resendOTPController);
router.post('/webhook', handleWebhookEvent);
router.use(tokenValidationMiddleware);
router.patch('/:userId/update-profile', updateProfileController);
router.patch('/:userId/change-password', changePasswordController);
router.post('/checkout', checkoutController); 
router.patch('/cancelBooking/:bookingId', cancelBookingController); 

export default router;
