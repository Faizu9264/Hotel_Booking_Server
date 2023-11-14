"use strict";
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
    sendOTP(email, otp) {
        console.log(transporter, 'transporter');
        console.log(email, 'sending otp to email');
        const mailOptions = {
            from: 'www.faizu9264@gmail.com',
            to: email,
            subject: 'OTP for Signup',
            text: `Your OTP for signup is: ${otp}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP email:', error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    storeOTP(email, otp) {
        this.otpRepository.storeOTP(email, otp);
    }
    getStoredOTP(email) {
        return this.otpRepository.getStoredOTP(email);
    }
    verifyOTP(email, userEnteredOTP) {
        const storedOTP = this.getStoredOTP(email);
        return storedOTP === userEnteredOTP;
    }
}
exports.DefaultOTPService = DefaultOTPService;
