// src/adapter/express/routes/adminRoutes.ts
import express, { Request, Response } from 'express';
import { adminLoginController } from '../controllers/adminController';
const router = express.Router();

// router.get('/users', (req: Request, res: Response) => {
//   res.send('Hello, TypeScript with Express! Admin');
// });

router.post('/login', adminLoginController);

export default router;
