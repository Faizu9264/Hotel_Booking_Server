// src/adapter/express/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import { RefreshTokenUseCase } from '../../../usecase/RefreshTokenUseCase';
import { container } from '../../../usecase/inversify.config';

export const refreshTokenMiddleware = (refreshTokenUseCase: RefreshTokenUseCase, role: string = 'user') => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log('hii'); 
        // Check the request for a valid refresh token
        const refreshToken = req.headers['authorization'];
        if (!refreshToken) {
            console.log('Refresh token not provided');
            
          return res.status(401).json({ error: 'Refresh token not provided' });
        }
  
        // Use refreshTokenUseCase to validate and refresh the access token
        const newAccessToken = await refreshTokenUseCase.execute(refreshToken, role);
  
        // Set the new access token in the request
        req.headers['authorization'] = `Bearer ${newAccessToken}`;
  
        next();
      } catch (error) {
        console.error('Error in refreshTokenMiddleware:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
  };

export const refreshAccessTokenController = async (req: Request, res: Response): Promise<void> => {

};
