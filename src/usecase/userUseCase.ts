// src/usecase/userUseCase.ts
import { UserDocument } from '../domain/entities/User';
import UserRepository from '../infrastructure/database/repositories/userRepository';
import { generateAccessToken, generateRefreshToken, comparePasswords, hashPassword } from '../infrastructure/utils/authUtils';
import { DefaultOTPService } from './otp/defaultOTPService';
import  InMemoryOTPRepository  from './otp/defaultOTPRepository';

export class DefaultUserUseCase {
  private otpService: DefaultOTPService;

  constructor() {
    const otpRepository = new InMemoryOTPRepository();
    this.otpService = new DefaultOTPService(otpRepository);
  }

  async sendOTP(email: string): Promise<{ message: string }> {
    const otp = this.otpService.generateOTP();
    this.otpService.storeOTP(email, otp);
    await this.otpService.sendOTP(email, otp);

    return { message: 'OTP sent successfully' };
  }

  async verifyOTP(email: string, userEnteredOTP: string): Promise<boolean> {
    const storedOTP = this.otpService.getStoredOTP(email);
    return storedOTP === userEnteredOTP;
  }

  async createUserAfterVerification(user: Omit<UserDocument, '_id'>): Promise<{ message: string }> {
    const hashedPassword = await hashPassword(user.password);
    const newUser = await UserRepository.create({ ...user, password: hashedPassword });
    return { message: 'Signup successful' };
  }
  async signUp(user: Omit<UserDocument, '_id'>): Promise<{ message: string }> {
    const otp = this.otpService.generateOTP();
    this.otpService.storeOTP(user.email, otp);
  
    this.otpService.sendOTP(user.email, otp);
  
    return { message: 'OTP sent for verification' };
  }

  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string } | null> {
    const existingUser = await UserRepository.findOne({ email });

    if (existingUser && (await comparePasswords(password, existingUser.password))) {
      const accessToken = generateAccessToken(existingUser);
      const refreshToken = generateRefreshToken(existingUser);

      return { accessToken, refreshToken };
    } else {
      return null;
    }
  }
}
