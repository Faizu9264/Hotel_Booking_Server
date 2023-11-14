"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryOTPRepository = void 0;
class InMemoryOTPRepository {
    constructor() {
        this.otpStore = new Map();
    }
    saveOTP(email, otp) {
        this.otpStore.set(email, otp);
    }
}
exports.InMemoryOTPRepository = InMemoryOTPRepository;
