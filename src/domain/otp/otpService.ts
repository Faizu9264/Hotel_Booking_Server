// src/domain/otp/otpService.ts
export interface OTPService {
  sendOTP(email: string): Promise<string>;
  storeOTP(email: string, otp: string, expiryTime: number): void;
  getStoredOTP(email: string): { otp: string; expiryTime: number } | undefined;
}
