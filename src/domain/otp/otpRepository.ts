// src/domain/otp/otpRepository.ts
export interface OTPRepository {
  storeOTP(email: string, otp: string): void;
  getStoredOTP(email: string): string | undefined;
}
