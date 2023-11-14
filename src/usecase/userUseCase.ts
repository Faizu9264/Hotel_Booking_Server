// src/usecase/userUseCase.ts
import { UserDocument } from '../domain/entities/User';
import UserRepository from '../infrastructure/database/repositories/userRepository';
import { generateAccessToken, generateRefreshToken, comparePasswords, hashPassword } from '../infrastructure/utils/authUtils';

export class DefaultUserUseCase {
  async signUp(user: Omit<UserDocument, '_id'>): Promise<{ accessToken: string; refreshToken: string }> {
    const hashedPassword = await hashPassword(user.password);
    const newUser = await UserRepository.create({ ...user, password: hashedPassword });

    // Generate access and refresh tokens
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    return { accessToken, refreshToken };
  }

  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string } | null> {
    const existingUser = await UserRepository.findOne({ email });

    if (existingUser && (await comparePasswords(password, existingUser.password))) {
      // Generate access and refresh tokens
      const accessToken = generateAccessToken(existingUser);
      const refreshToken = generateRefreshToken(existingUser);

      return { accessToken, refreshToken };
    } else {
      return null;
    }
  }
}
