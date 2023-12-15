import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export const tokenValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response<any, Record<string, any>> => {
  const secretKey: Secret | undefined = process.env.JWT_SECRET || undefined;


  if (!secretKey) {
    console.error('JWT_SECRET is not defined in the environment variables.');
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  const authHeaderToken = req.header('Authorization')?.replace('Bearer ', '');
  const token = authHeaderToken;

 
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing Token' });
  }

  try {
    const decoded = jwt.decode(token) as JwtPayload;

    if (!decoded) {
      console.error('Invalid token content.');
      return res.status(401).json({ error: 'Unauthorized - Invalid Token Content' });
    }


    if (decoded.role === 'admin' || decoded.role === 'user') {
      (req as any).user = decoded;
      next();
    } else {

      return res.status(403).json({ error: 'Forbidden - Invalid Role' });
    }
  } catch (error) {
    console.error('Error in token validation middleware:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
  }
};
