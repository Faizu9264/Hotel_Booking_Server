"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryOTPRepository {
    constructor() {
        this.otpStore = {};
    }
    storeOTP(email, otp) {
        this.otpStore[email] = otp;
    }
    getStoredOTP(email) {
        return this.otpStore[email];
    }
}
exports.default = InMemoryOTPRepository;
