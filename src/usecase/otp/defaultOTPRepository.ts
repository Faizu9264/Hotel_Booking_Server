// src/usecase/otp/defaultOTPRepository.ts
import { OTPRepository } from '../../domain/otp/otpRepository';

export default class InMemoryOTPRepository implements OTPRepository {
  private otpStore: Record<string, string> = {};

  storeOTP(email: string, otp: string): void {
    this.otpStore[email] = otp;
  }

  getStoredOTP(email: string): string | undefined {
    return this.otpStore[email];
  }
}
