// src/usecase/RefreshTokenUseCase.ts
import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { UserDocument } from '../domain/entities/User';
import { secretKey } from '../infrastructure/utils/authUtils';

@injectable()
export class RefreshTokenUseCase {
  execute(refreshToken: string, role: string): string | null {
    try {
      // Verify the refresh token
      
      const decoded = jwt.verify(refreshToken, secretKey) as { userId: string; email: string };

      const newAccessToken = jwt.sign({ userId: decoded.userId, email: decoded.email, role }, secretKey, {
        expiresIn: '1h',
      });

      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return null;
    }
  }
}
