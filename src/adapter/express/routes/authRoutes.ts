// src/adapter/express/routes/authRoutes.ts
import express, { Request, Response } from 'express';
import { refreshAccessTokenController } from '../controllers/authController';

const router = express.Router();

router.post('/refresh', refreshAccessTokenController);

export default router;
