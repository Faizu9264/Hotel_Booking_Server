// src/adapter/express/routes/adminRoutes.ts
import express, { Request, Response } from 'express';
import { adminLoginController } from '../controllers/adminController';
const router = express.Router();

router.post('/login', adminLoginController);

export default router;
