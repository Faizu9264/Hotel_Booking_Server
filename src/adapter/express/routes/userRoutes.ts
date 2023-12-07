// src/adapter/express/routes/userRoutes.ts

import express, { Request, Response } from 'express';
import { refreshTokenMiddleware } from '../controllers/authController';
import { container } from '../../../usecase/inversify.config';
import { RefreshTokenUseCase } from '../../../usecase/RefreshTokenUseCase'; 
import {
  sendOTPController,
  verifyOTPController,
  completeSignupController,
  loginController,
  googleLoginController,
  resendOTPController
} from '../controllers/userController';
const router = express.Router();
const refreshTokenUseCase = container.get<RefreshTokenUseCase>(RefreshTokenUseCase);

router.post('/signup', sendOTPController);
router.post('/verify-otp', verifyOTPController);
router.post('/complete-signup', completeSignupController);
router.post('/login', loginController);
router.post('/google-login', googleLoginController);
router.post('/resend-otp', resendOTPController);

// router.use( refreshTokenMiddleware(refreshTokenUseCase))
export default router;
