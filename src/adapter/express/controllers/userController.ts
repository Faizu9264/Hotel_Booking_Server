// src/adapter/express/controllers/userController.ts
import { Request, Response } from 'express';
import { DefaultUserUseCase } from '../../../usecase/userUseCase';

export const signUpController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const userUseCase = new DefaultUserUseCase();
    await userUseCase.signUp({ username, email, password } as any);

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error in signUpController:', error);
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