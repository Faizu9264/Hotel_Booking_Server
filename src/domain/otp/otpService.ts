// src/domain/otp/otpService.ts
export interface OTPService {
    generateOTP(): string;
    sendOTP(email: string, otp: string): void;
    storeOTP(email: string, otp: string): void;
    getStoredOTP(email: string): string | undefined;
  }
  