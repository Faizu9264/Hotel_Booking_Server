// src/usecase/otp/defaultOTPService.ts
import { OTPService } from '../../domain/otp/otpService';
import OTPRepository from './defaultOTPRepository';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'www.faizu9264@gmail.com',
    pass: 'zzbp qmhe joxn tler',
  },
});


export class DefaultOTPService implements OTPService {
  private otpRepository: OTPRepository;

  constructor(otpRepository: OTPRepository) {
    this.otpRepository = otpRepository;
  }

  generateOTP(): string {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    
 
    console.log('Generated OTP:', generatedOTP);

    return generatedOTP;
  }

  sendOTP(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const otp = this.generateOTP();
      console.log(email, 'sending otp to email');
  
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
          await this.storeOTP(email, otp);
          console.log('Email sent: ' + info.response);
          resolve(otp);
        }
      });
    });
  }
  


storeOTP(email: string, otp: string): void {
  const otpStore = DefaultOTPService.getOtpStore();
  otpStore[email] = otp;
}

getStoredOTP(email: string): string | undefined {
  const otpStore = DefaultOTPService.getOtpStore();
  return otpStore[email];
}

verifyOTP(email: string, userEnteredOTP: string): boolean {
  const storedOTP = this.getStoredOTP(email);
  console.log(storedOTP, 'storedOTP');
  return storedOTP === userEnteredOTP;
}

// Static method to get or create a singleton instance of the OTP store
private static getOtpStore(): Record<string, string> {
  if (!DefaultOTPService.otpStore) {
    DefaultOTPService.otpStore = {};
  }
  return DefaultOTPService.otpStore;
}

private static otpStore: Record<string, string>;

// ...

}
