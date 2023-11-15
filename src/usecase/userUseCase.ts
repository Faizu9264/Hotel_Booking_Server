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
    const otp = await this.otpService.sendOTP(email);
    return { message: 'OTP sent successfully' };
  }

  async verifyOTP(email: string, userEnteredOTP: string): Promise<boolean> {
    const storedOTP = this.otpService.getStoredOTP(email);
    console.log(storedOTP,'storedOTP');
    return storedOTP === userEnteredOTP;
  }

  async createUserAfterVerification(user: Omit<UserDocument, '_id'>): Promise<{ message: string }> {
    try {
      console.log('User before hashing password:', user);
      const hashedPassword = await hashPassword(user.password);
      console.log('Hashed Password:', hashedPassword);
      const newUser = await UserRepository.create({ ...user, password: hashedPassword });
      console.log('New User Created:', newUser);
      return { message: 'Signup successful' };
    } catch (error) {
      console.error('Error creating user after verification:', error);
      throw error;
    }
  }
  
  async signUp(user: Omit<UserDocument, '_id'>): Promise<{ message: string }> {
    try {
      const otp = await this.otpService.sendOTP(user.email);
      console.log('OTP sent for verification:', otp);
      return { message: 'OTP sent for verification' };
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Error sending OTP');
    }
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
