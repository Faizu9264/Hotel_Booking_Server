// src/adapter/express/controllers/userController.ts
import { Request, Response } from 'express';
import { DefaultUserUseCase } from '../../../usecase/userUseCase';
import { DefaultOTPService } from '../../../usecase/otp/defaultOTPService';
import DefaultOTPRepository from '../../../usecase/otp/defaultOTPRepository';

import InMemoryOTPRepository from '../../../usecase/otp/defaultOTPRepository';  

const otpRepository = new InMemoryOTPRepository(); 
const otpService = new DefaultOTPService(otpRepository);

export const signUpController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const userUseCase = new DefaultUserUseCase();
    await userUseCase.sendOTP(email);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in signUpController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const verifyOTPController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;

    const userUseCase = new DefaultUserUseCase();
    const isOTPValid = await userUseCase.verifyOTP(email, otp);

    if (isOTPValid) {
      const { username, password } = req.body;
      await userUseCase.createUserAfterVerification({ username, email, password } as any);
      res.status(201).json({ message: 'Signup successful' });
    } else {
      res.status(401).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error in verifyOTPController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const userUseCase = new DefaultUserUseCase();
    const tokens = await userUseCase.login(email, password);

    if (tokens) {
      // Send the access token in the response
      res.cookie('accessToken', tokens.accessToken, { httpOnly: true });

      // Send any other information as needed
      res.status(200).json({ message: 'Login successful'});
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in loginController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  
  }
};