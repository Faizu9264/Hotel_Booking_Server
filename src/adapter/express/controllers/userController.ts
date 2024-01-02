import { Request, Response } from 'express';
import { DefaultUserUseCase } from '../../../usecase/userUseCase';
import { DefaultOTPService } from '../../../usecase/otp/defaultOTPService';
import InMemoryOTPRepository from '../../../usecase/otp/defaultOTPRepository';
import { generateAccessToken } from '../../../infrastructure/utils/authUtils';
import { createBookingController } from './bookingController';
import NodeCache from 'node-cache';

// Initialize the cache
const cache = new NodeCache();

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



// Import necessary modules and classes

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log('Received login credentials:', email, password);
  
    const userUseCase = new DefaultUserUseCase();
    const user = await userUseCase.getUserByEmail(email); 

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    const tokens = await userUseCase.login(email, password);

    if (tokens) {
      const isSecureCookie = process.env.COOKIE_SECURE === 'true';

      res.status(200).json({
        message: 'Login successful',
        accessToken: generateAccessToken(user, 'user'),
        user: {
          userId: user._id,
          username: user.username,
          email: user.email,      
          phoneNumber:user.phoneNumber,
          profileImage:user.profileImage,
          blocked:user.blocked,
          role: 'user', 
        },
      });
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
    const { _id,email, username, token } = req.body;
    console.log('email, username,token', email, username,token);

    const userUseCase = new DefaultUserUseCase();

    const existingUser = await userUseCase.getUserByEmail(email);
    console.log('existingUser', existingUser);

    if (existingUser) {
      const accessToken = generateAccessToken(existingUser, 'user');
      const user = await userUseCase.getUserByEmail(email); 

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
      res.status(200).json({ message: 'Login successful', accessToken,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,      
        phoneNumber:user.phoneNumber,
        profileImage:user.profileImage,
        blocked:user.blocked,
        role: 'user', 
      }, });
    } else {
      // Use the token as the user ID
      const newUser = { _id: _id, email, username, password: token };

      await userUseCase.createUserAfterVerification(newUser as any);
      const getUser = await userUseCase.getUserByEmail(email);
      const accessToken = generateAccessToken(getUser as any, 'user');
      const user = await userUseCase.getUserByEmail(email); 
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      res.status(201).json({ message: 'Signup successful', accessToken ,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,      
        phoneNumber:user.phoneNumber,
        profileImage:user.profileImage,
        blocked:user.blocked,
        role: 'user', 
      },});
    }
  } catch (error) {
    console.error('Error in googleLoginController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const resendOTPController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const userUseCase = new DefaultUserUseCase();
    await userUseCase.resendOTP(email);

    res.status(200).json({ message: 'Resent OTP successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const updateProfileController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;

    // Check if userId is not defined
    if (userId === undefined) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const updatedData = req.body;
    console.log('body', updatedData);

    const userUseCase = new DefaultUserUseCase();

   
    {
      const updatedUser = await userUseCase.updateProfile(userId, updatedData);
      console.log('updatedUser ', updatedUser);

      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  } catch (error) {
    console.error('Error in updateProfileController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const changePasswordController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId; 
    const { currentPassword, newPassword } = req.body;

    const userUseCase = new DefaultUserUseCase();
    const isPasswordChanged = await userUseCase.changePassword(userId, currentPassword, newPassword);

    if (isPasswordChanged) {
      res.status(200).json({ message: 'Password changed successfully' });
    } else {
      res.status(401).json({ error: 'Invalid current password' });
    }
  } catch (error) {

    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// export const checkoutController = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { bookingDetails, currency,userId } = req.body;
//     const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//     console.log('req.body', req.body);

//     const USER_DOMAIN = process.env.USER_DOMAIN;
//     const formatDate = (dateString:Date) => {
//       const date = new Date(dateString);
//       const day = date.getDate().toString().padStart(2, '0');
//       const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
//       const year = date.getFullYear().toString().slice(2, 4);
//       return `${day}/${month}/${year}`;
//     };

//     const formattedCheckInDate = formatDate(bookingDetails.checkInDate);
//     const formattedCheckOutDate = formatDate(bookingDetails.checkOutDate);

//     const Description = `${formattedCheckInDate} to ${formattedCheckOutDate}, ${bookingDetails.adultCount} adults, ${bookingDetails.childrenCount} children`;
//     const product = await stripe.products.create({
//       name: bookingDetails.roomDetails.roomType,
//       images: bookingDetails.roomDetails.images,
//       description: Description,
//     });
//     const price = await stripe.prices.create({
//       unit_amount: bookingDetails.total * 100,
//       currency: currency,
//       product: product.id,  
//     });

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price: price.id,
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${USER_DOMAIN}/payment/success?success=true`,
//       cancel_url: `${USER_DOMAIN}/payment/failed`,
//     });
    
//     res.status(200).json({ sessionId: session.id ,bookingDetails});
//   } catch (error: any) {
//     console.error('Error creating checkout session:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// src/adapter/express/controllers/userController.ts

export const checkoutController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookingDetails, currency, userId } = req.body;
    console.log('checkout body',req.body);
    
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const USER_DOMAIN = process.env.USER_DOMAIN;
    const formatDate = (dateString: Date) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(2, 4);
      return `${day}/${month}/${year}`;
    };

    const formattedCheckInDate = formatDate(bookingDetails.checkInDate);
    const formattedCheckOutDate = formatDate(bookingDetails.checkOutDate);
    
    const description = `${formattedCheckInDate} to ${formattedCheckOutDate}, ${bookingDetails.adultCount} adults, ${bookingDetails.childrenCount} children`;

     req.app.locals.CheckoutBody = req.body;

    const product = await stripe.products.create({
      name: bookingDetails.roomDetails.roomType,
      images: bookingDetails.roomDetails.images.map(String),
      description: String(description).slice(0, 500),
    });

    const price = await stripe.prices.create({
      unit_amount: bookingDetails.total * 100,
      currency: currency,
      product: product.id,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${USER_DOMAIN}/payment/success?success=true`,
      cancel_url: `${USER_DOMAIN}/payment/failed`,
    });

    res.status(200).json({ sessionId: session.id, bookingDetails });
  } catch (error: any) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



