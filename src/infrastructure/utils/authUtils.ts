// src/infrastructure/utils/authUtils.ts
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../../domain/entities/User';



export const secretKey: Secret = process.env.JWT_SECRET || 'fallbackSecretKey';

export const generateAccessToken = (user: User): string => {
  const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
    expiresIn: '1h',
  });
  return token;
};

export const generateRefreshToken = (user: User): string => {
  const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
    expiresIn: '7d',
  });
  return token;
};



export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, hashedPassword);
};
