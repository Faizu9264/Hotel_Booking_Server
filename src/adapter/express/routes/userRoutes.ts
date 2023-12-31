// src/adapter/express/routes/userRoutes.ts

import express, { Request, Response } from 'express';
import {
  sendOTPController,
  verifyOTPController,
  completeSignupController,
  loginController,
  googleLoginController
} from '../controllers/userController';
const router = express.Router();
router.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
  });
router.post('/signup', sendOTPController);
router.post('/verify-otp', verifyOTPController);
router.post('/complete-signup', completeSignupController);
router.post('/login', loginController);
router.post('/google-login', googleLoginController);
export default router;
