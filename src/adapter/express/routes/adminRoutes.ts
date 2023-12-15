// src/adapter/express/routes/adminRoutes.ts
import express from 'express';
import {
  adminLoginController,
  getAllUsersController,
  editUserController,
  blockUserController,
  unblockUserController,
} from '../controllers/adminController';

const router = express.Router();

router.post('/login', adminLoginController);
router.get('/users', getAllUsersController);
router.patch('/user/edit/:userId', editUserController);
router.patch('/user/block/:userId', blockUserController);
router.patch('/user/unblock/:userId', unblockUserController);

export default router;
