// src/adapter/express/controllers/adminController.ts
import { Request, Response } from 'express';
import { AdminUseCase } from '../../../usecase/interfaces/AdminUseCase';
import { DefaultAdminUseCase } from '../../../usecase/adminUseCase';
import { generateAccessToken, generateRefreshToken } from '../../../infrastructure/utils/authUtils';
import { AdminDocument } from '../../../domain/entities/Admin';

export const adminLoginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const adminUseCase: AdminUseCase = new DefaultAdminUseCase();
    const tokenPair = await adminUseCase.login(email, password);

    if (tokenPair) {
      const accessToken = generateAccessToken({ email } as AdminDocument ,'admin');
      const refreshToken = generateRefreshToken({ email } as AdminDocument);

      res.cookie('accessToken', accessToken, { httpOnly: true });
  

      res.status(200).json({ message: 'Admin login successful',refreshToken });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in adminLoginController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
