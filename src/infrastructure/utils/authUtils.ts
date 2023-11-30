// src/infrastructure/utils/authUtils.ts
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { UserDocument } from '../../domain/entities/User'; 
import { AdminDocument } from '../../domain/entities/Admin';



export const secretKey: Secret = process.env.JWT_SECRET || 'fallbackSecretKey';

export const generateAccessToken = (user: UserDocument | AdminDocument, role: string): string => {
  const token = jwt.sign({ userId: user._id?.toString(), email: user.email, role }, secretKey, {
    expiresIn: '1h',
  });
  return token;
};

export const generateRefreshToken = (user: UserDocument | AdminDocument): string => {
  const token = jwt.sign({ userId: user._id?.toString(), email: user.email }, secretKey, {
    expiresIn: '7d',
  });
  return token;
};


export const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  console.log('Comparing passwords:', password, hashedPassword);
  const match = await bcrypt.compare(password, hashedPassword);
  console.log('Password comparison result:', match);
  return match;
};
