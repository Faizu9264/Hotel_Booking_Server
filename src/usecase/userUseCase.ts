// src/usecase/userUseCase.ts
import { UserDocument } from '../domain/entities/User';
import UserRepository from '../infrastructure/database/repositories/userRepository';
import { generateAccessToken,  comparePasswords, hashPassword } from '../infrastructure/utils/authUtils';
import { DefaultOTPService } from './otp/defaultOTPService';
import InMemoryOTPRepository from './otp/defaultOTPRepository';
// import userRepository from '../infrastructure/database/repositories/userRepository';

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


  async createUserAfterVerification(user: Omit<UserDocument, '_id'>): Promise<{ message: string }> {
    try {
      const { email, password } = user;
      const hashedPassword = await hashPassword(password);
  
      const newUser = await UserRepository.create({
        ...user,
        email,
        password: hashedPassword,
        role: 'user',
      });
  
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

  async login(email: string, password: string): Promise<{ accessToken: string;} | null> {
    const existingUser = await UserRepository.findOne({ email });

    if (existingUser && (await comparePasswords(password, existingUser.password))) {
      const accessToken = generateAccessToken(existingUser ,'user');
       
      return {accessToken};
    } else {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return UserRepository.findOne({ email });
  }

  async resendOTP(email: string): Promise<{ message: string }> {
    try {
      await this.otpService.resendOTP(email);
      return { message: 'Resent OTP successfully' };
    } catch (error) {
      console.error('Error resending OTP:', error);
      throw new Error('Error resending OTP');
    }
  }

  async updateProfile(userId: string, updatedData: Partial<UserDocument>): Promise<UserDocument | null> {
    try {
      const user = await UserRepository.findOne({ _id: userId });
    
      if (!user) {
        console.log('User not found');
        return null;
      }
    
      console.log('Updating user:', user);
   
      Object.assign(user, updatedData);
   
      const updatedUser = await user.save();
      console.log('Updated user:', updatedUser);
    
      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
  
  
  

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
    try {
      const user = await UserRepository.findOne({ _id: userId });

      if (!user) {
        return false; 
      }

      const isCurrentPasswordValid = await comparePasswords(currentPassword, user.password);

      if (!isCurrentPasswordValid) {
        return false;
      }

      user.password = await hashPassword(newPassword);
      await user.save();

      return true; 
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }

  async getUserByToken(token: string): Promise<UserDocument | null> {
    return UserRepository.findOne({ _id: token });
  }
  
}
