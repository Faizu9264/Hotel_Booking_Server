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
  try {
    console.log('Password to hash:', password);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};


export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

