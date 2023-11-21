


// src/usecase/otp/defaultOTPService.ts
import { OTPService } from '../../domain/otp/otpService';
import OTPRepository from './defaultOTPRepository';
import nodemailer from 'nodemailer';

export class DefaultOTPService implements OTPService {
  
  private otpRepository: OTPRepository;

  constructor(otpRepository: OTPRepository) {
    this.otpRepository = otpRepository;
  }

  generateOTPWithExpiry(): { otp: string; expiryTime: number } {
    
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = Date.now() + 3 * 60 * 1000; 

    console.log('Generated OTP:', generatedOTP, 'Expiry Time:', new Date(expiryTime));

    return { otp: generatedOTP, expiryTime };
  }

  sendOTP(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const { otp, expiryTime } = this.generateOTPWithExpiry();
      console.log(email, 'sending otp to email');


      let password = process.env.GMAIL_PASSWORD
console.log(password);

const transporter = nodemailer.createTransport({
  
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'www.faizu9264@gmail.com',
    pass: password as string,
  },
  logger: true,  
});

      const mailOptions = {
        from: 'www.faizu9264@gmail.com',
        to: email,
        subject: 'OTP for Signup',
        text: `Your OTP for signup is: ${otp}`,
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error('Error sending OTP email:', error);
          reject(error);
        } else {
          await this.storeOTP(email, otp, expiryTime);
          console.log('Email sent: ' + info.response);
          resolve(otp);
        }
      });
    });
  }

  // generateOTP(): string {
  //   const { otp } = this.generateOTPWithExpiry();
  //   return otp;
  // }
  storeOTP(email: string, otp: string, expiryTime: number): void {
    const otpStore = DefaultOTPService.getOtpStore();
    otpStore[email] = { otp, expiryTime };
  }
  
  getStoredOTP(email: string): { otp: string; expiryTime: number } | undefined {
    const otpStore = DefaultOTPService.getOtpStore();
    const storedOTP = otpStore[email];
    return storedOTP;
  }

  verifyOTP(email: string, userEnteredOTP: string): { success: boolean; message: string } {
    const storedOTP = this.getStoredOTP(email);
    console.log('storedOTP', storedOTP, 'userEnteredOTP', userEnteredOTP);
  
    if (storedOTP) {
      const timeDifference = Date.now() - storedOTP.expiryTime; 
      const expirationThreshold = 2 * 60 * 1000;
  
      if (timeDifference <= expirationThreshold) {
        console.log(storedOTP.otp, 'storedOTP');
        return { success: storedOTP.otp === userEnteredOTP, message: 'OTP verification successful' };
      } else {
        console.log('OTP has expired');
        return { success: false, message: 'OTP has expired' };
      }
    }
  
    return { success: false, message: 'Invalid OTP' };
  }
  
  
  // Resend OTP with a new expiry
  async resendOTP(email: string): Promise<void> {
    try {
      const { otp, expiryTime } = this.generateOTPWithExpiry();
      console.log(email, 'resending otp to email');

      let password = process.env.GMAIL_PASSWORD
      console.log(password);

const transporter = nodemailer.createTransport({
  

  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'www.faizu9264@gmail.com',
    pass: password as string,
  },
  logger: true,  
});

  
      const mailOptions = {
        from: 'www.faizu9264@gmail.com',
        to: email,
        subject: 'New OTP for Signup',
        text: `Your new OTP for signup is: ${otp}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      await this.storeOTP(email, otp, expiryTime);
      console.log('Email resent successfully');
    } catch (error) {
      console.error('Error resending OTP:', error);
      throw new Error('Error resending OTP');
    }
  }

  private static getOtpStore(): Record<string, { otp: string; expiryTime: number }> {
    if (!DefaultOTPService.otpStore) {
      DefaultOTPService.otpStore = {};
    }
    return DefaultOTPService.otpStore;
  }

  private static otpStore: Record<string, { otp: string; expiryTime: number }>;

  // ...
}
