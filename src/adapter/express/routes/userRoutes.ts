// src/adapter/express/routes/userRoutes.ts
import express from 'express';
import { tokenValidationMiddleware } from '../middleware/tokenValidationMiddleware';
import { signUpController, verifyOTPController,loginController  } from '../controllers/userController';
const router = express.Router();

router.post('/signup', signUpController);
router.post('/verify-otp', verifyOTPController);
router.post('/login', loginController);
export default router;
