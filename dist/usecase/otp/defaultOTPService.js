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
class DefaultOTPService {
    constructor(otpRepository) {
        this.otpRepository = otpRepository;
    }
    generateOTPWithExpiry() {
        const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryTime = Date.now() + 3 * 60 * 1000;
        console.log('Generated OTP:', generatedOTP, 'Expiry Time:', new Date(expiryTime));
        return { otp: generatedOTP, expiryTime };
    }
    sendOTP(email) {
        return new Promise((resolve, reject) => {
            const { otp, expiryTime } = this.generateOTPWithExpiry();
            console.log(email, 'sending otp to email');
            let password = process.env.GMAIL_PASSWORD;
            console.log(password);
            const transporter = nodemailer_1.default.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'www.faizu9264@gmail.com',
                    pass: password,
                },
                logger: true,
            });
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
                    yield this.storeOTP(email, otp, expiryTime);
                    console.log('Email sent: ' + info.response);
                    resolve(otp);
                }
            }));
        });
    }
    // generateOTP(): string {
    //   const { otp } = this.generateOTPWithExpiry();
    //   return otp;
    // }
    storeOTP(email, otp, expiryTime) {
        const otpStore = DefaultOTPService.getOtpStore();
        otpStore[email] = { otp, expiryTime };
    }
    getStoredOTP(email) {
        const otpStore = DefaultOTPService.getOtpStore();
        const storedOTP = otpStore[email];
        return storedOTP;
    }
    verifyOTP(email, userEnteredOTP) {
        const storedOTP = this.getStoredOTP(email);
        console.log('storedOTP', storedOTP, 'userEnteredOTP', userEnteredOTP);
        if (storedOTP) {
            const timeDifference = Date.now() - storedOTP.expiryTime;
            const expirationThreshold = 2 * 60 * 1000;
            if (timeDifference <= expirationThreshold) {
                console.log(storedOTP.otp, 'storedOTP');
                return { success: storedOTP.otp === userEnteredOTP, message: 'OTP verification successful' };
            }
            else {
                console.log('OTP has expired');
                return { success: false, message: 'OTP has expired' };
            }
        }
        return { success: false, message: 'Invalid OTP' };
    }
    // Resend OTP with a new expiry
    resendOTP(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, expiryTime } = this.generateOTPWithExpiry();
                console.log(email, 'resending otp to email');
                let password = process.env.GMAIL_PASSWORD;
                console.log(password);
                const transporter = nodemailer_1.default.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'www.faizu9264@gmail.com',
                        pass: password,
                    },
                    logger: true,
                });
                const mailOptions = {
                    from: 'www.faizu9264@gmail.com',
                    to: email,
                    subject: 'New OTP for Signup',
                    text: `Your new OTP for signup is: ${otp}`,
                };
                yield transporter.sendMail(mailOptions);
                yield this.storeOTP(email, otp, expiryTime);
                console.log('Email resent successfully');
            }
            catch (error) {
                console.error('Error resending OTP:', error);
                throw new Error('Error resending OTP');
            }
        });
    }
    static getOtpStore() {
        if (!DefaultOTPService.otpStore) {
            DefaultOTPService.otpStore = {};
        }
        return DefaultOTPService.otpStore;
    }
}
exports.DefaultOTPService = DefaultOTPService;
