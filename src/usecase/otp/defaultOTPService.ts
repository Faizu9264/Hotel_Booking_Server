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
    pass: 'qzag oqpm vlki mutv',
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

  sendOTP(email: string, otp: string): void {
       console.log(transporter,'transporter');
    
    console.log(email,'sending otp to email');
    
    const mailOptions = {
      from: 'www.faizu9264@gmail.com',
      to: email,
      subject: 'OTP for Signup',
      text: `Your OTP for signup is: ${otp}`,
    };
 
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending OTP email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  storeOTP(email: string, otp: string): void {
    this.otpRepository.storeOTP(email, otp);
  }

  getStoredOTP(email: string): string | undefined {
    return this.otpRepository.getStoredOTP(email);
  }

  verifyOTP(email: string, userEnteredOTP: string): boolean {
    const storedOTP = this.getStoredOTP(email);
    return storedOTP === userEnteredOTP;
  }
}
