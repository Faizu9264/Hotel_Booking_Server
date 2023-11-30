// src/adapter/express/middleware/tokenValidationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export const tokenValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const secretKey: Secret = process.env.JWT_SECRET || 'fallbackSecretKey';
  const authHeaderToken = req.header('Authorization')?.replace('Bearer ', '');
  const cookieToken = req.cookies.accessToken;
  const token = authHeaderToken || cookieToken;
  const refreshToken = req.cookies.refreshToken;
  if (!token&& !refreshToken) {
    res.status(401).json({ error: 'Unauthorized - Missing Token' });
    return;
  }
  
  try {
    const decoded: any = jwt.verify(token, secretKey);
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      const newToken = jwt.sign({ userId: decoded.userId, email: decoded.email }, secretKey, {
        expiresIn: '1h',
      });

      res.setHeader('Authorization', `Bearer ${newToken}`);
      res.cookie('accessToken', newToken, { httpOnly: true });
    }

    (req as any).user = decoded;

    next();
  } catch (error) {
    console.error('Error in token validation middleware:', error);
    res.status(401).json({ error: 'Unauthorized - Invalid Token' });
  }
};
