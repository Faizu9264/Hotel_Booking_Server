"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOTPService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'www.faizu9264@gmail.com',
        pass: 'qzag oqpm vlki mutv',
    },
});
class DefaultOTPService {
    constructor(otpRepository) {
        this.otpRepository = otpRepository;
    }
    generateOTP() {
        const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Generated OTP:', generatedOTP);
        return generatedOTP;
    }
    sendOTP(email) {
        return new Promise((resolve, reject) => {
            const otp = this.generateOTP();
            console.log(email, 'sending otp to email');
            const mailOptions = {
                from: 'www.faizu9264@gmail.com',
                to: email,
                subject: 'OTP for Signup',
                text: `Your OTP for signup is: ${otp}`,
            };
            transporter.sendMail(mailOptions, (error, info) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    console.error('Error sending OTP email:', error);
                    reject(error);
                }
                else {
                    yield this.storeOTP(email, otp);
                    console.log('Email sent: ' + info.response);
                    resolve(otp);
                }
            }));
        });
    }
    storeOTP(email, otp) {
        const otpStore = DefaultOTPService.getOtpStore();
        otpStore[email] = otp;
    }
    getStoredOTP(email) {
        const otpStore = DefaultOTPService.getOtpStore();
        return otpStore[email];
    }
    verifyOTP(email, userEnteredOTP) {
        const storedOTP = this.getStoredOTP(email);
        console.log(storedOTP, 'storedOTP');
        return storedOTP === userEnteredOTP;
    }
    // Static method to get or create a singleton instance of the OTP store
    static getOtpStore() {
        if (!DefaultOTPService.otpStore) {
            DefaultOTPService.otpStore = {};
        }
        return DefaultOTPService.otpStore;
    }
}
exports.DefaultOTPService = DefaultOTPService;
