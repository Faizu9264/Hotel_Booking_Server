// src/adapter/express/controllers/userController.ts
import { Request, Response } from 'express';
import { DefaultUserUseCase } from '../../../usecase/userUseCase';
import { DefaultOTPService } from '../../../usecase/otp/defaultOTPService';
import InMemoryOTPRepository from '../../../usecase/otp/defaultOTPRepository';
import { generateAccessToken, generateRefreshToken, comparePasswords, hashPassword } from '../../../infrastructure/utils/authUtils';

const otpRepository = new InMemoryOTPRepository(); 
const otpService = new DefaultOTPService(otpRepository);

export const sendOTPController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const userUseCase = new DefaultUserUseCase();
    await userUseCase.sendOTP(email);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in sendOTPController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
};

export const verifyOTPController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp} = req.body;
    console.log('Received data:', email, otp);

    // const userUseCase = new DefaultUserUseCase();
    const isOTPValid = await otpService.verifyOTP(email, otp);

    if (isOTPValid) {
      console.log('OTP is valid....');
      res.status(200).json({ message: 'OTP verification successful' });
    } else {
      console.log('Invalid OTP');
      res.status(401).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error in verifyOTPController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const completeSignupController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    console.log('Received data for complete signup:', { username, email, password });

    const userUseCase = new DefaultUserUseCase();
    await userUseCase.createUserAfterVerification({ username, email, password } as any);

    res.status(201).json({ message: 'Signup successful' });
  } catch (error:any) {
    console.error('Error in completeSignupController:', error);

    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      const duplicateValue = error.keyValue[duplicateField];

      res.status(400).json({
        error: ` The ${duplicateField} '${duplicateValue}' is already in use.`,
      });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};




export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log('Received login credentials:', email, password);
  
    const userUseCase = new DefaultUserUseCase();
    const tokens = await userUseCase.login(email, password);

    if (tokens) {
      const isSecureCookie = process.env.COOKIE_SECURE === 'true';
      
      res.cookie('accessToken', tokens.accessToken, { httpOnly: true, secure: isSecureCookie });

      res.status(200).json({ message: 'Login successful', refreshToken: tokens.refreshToken });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in loginController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const googleLoginController = async (req: Request, res: Response): Promise<void> => {
  console.log('inside googleLoginController');
  
  try {
    const { email, username, token } = req.body;
     console.log('email, username',email, username);
     
    const userUseCase = new DefaultUserUseCase();

    const existingUser = await userUseCase.getUserByEmail(email);
   console.log('existingUser',existingUser);
   
    if (existingUser) {
      const accessToken = generateAccessToken(existingUser ,'user');
      res.status(200).json({ message: 'Login successful', accessToken });
    } else {
      const newUser = { email, username, password: token };


      await userUseCase.createUserAfterVerification(newUser as any); 
      const getUser = await userUseCase.getUserByEmail(email);
      const accessToken = generateAccessToken(getUser as any ,'user'); 

      res.status(201).json({ message: 'Signup successful', accessToken });
    }
  } catch (error) {
    console.error('Error in googleLoginController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Inside userController.ts

export const resendOTPController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const userUseCase = new DefaultUserUseCase();
    await userUseCase.resendOTP(email);

    res.status(200).json({ message: 'Resent OTP successfully' });
  } catch (error) {
    console.error('Error in resendOTPController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
