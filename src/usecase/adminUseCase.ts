// src/usecase/adminUseCase.ts
import { AdminUseCase } from './interfaces/AdminUseCase';
import AdminRepository from '../infrastructure/database/repositories/adminRepository';
import { comparePasswords, generateAccessToken, generateRefreshToken } from '../infrastructure/utils/authUtils';

export class DefaultAdminUseCase implements AdminUseCase {
  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string } | null> {
    const admin = await AdminRepository.findOne({ email: email.toLowerCase() });

    console.log('Admin:', admin);
    console.log('Entered password:', password);
    console.log('Hashed password in the database:', admin?.password);

    if (admin) {
      console.log('Entered password:', password);
      console.log('Hashed password in the database:', admin.password);
      const isPasswordMatch = await comparePasswords(password, admin.password);
      console.log('Password match result:', isPasswordMatch);

      if (isPasswordMatch) {
        // Passwords match, generate tokens
        const accessToken = generateAccessToken(admin, 'admin');
        const refreshToken = generateRefreshToken(admin);

        return { accessToken, refreshToken };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
