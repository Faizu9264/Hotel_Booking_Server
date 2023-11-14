// src/adapter/express/routes/userRoutes.ts
import express from 'express';
import { signUpController, loginController } from '../controllers/userController';
import { tokenValidationMiddleware } from '../middleware/tokenValidationMiddleware';

const router = express.Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
export default router;
