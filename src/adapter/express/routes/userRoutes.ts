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
  changePasswordController
} from '../controllers/userController';
const router = express.Router();

router.post('/signup', sendOTPController);
router.post('/verify-otp', verifyOTPController);
router.post('/complete-signup', completeSignupController);
router.post('/login', loginController);
router.post('/google-login', googleLoginController);
router.post('/resend-otp', resendOTPController);
router.use(tokenValidationMiddleware);
router.patch('/:userId/update-profile', updateProfileController);
router.patch('/:userId/change-password', changePasswordController);

export default router;
