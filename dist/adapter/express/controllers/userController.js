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
exports.loginController = exports.verifyOTPController = exports.signUpController = void 0;
const userUseCase_1 = require("../../../usecase/userUseCase");
const defaultOTPService_1 = require("../../../usecase/otp/defaultOTPService");
const defaultOTPRepository_1 = __importDefault(require("../../../usecase/otp/defaultOTPRepository"));
const otpRepository = new defaultOTPRepository_1.default();
const otpService = new defaultOTPService_1.DefaultOTPService(otpRepository);
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const userUseCase = new userUseCase_1.DefaultUserUseCase();
        yield userUseCase.sendOTP(email);
        res.status(200).json({ message: 'OTP sent successfully' });
    }
    catch (error) {
        console.error('Error in signUpController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.signUpController = signUpController;
const verifyOTPController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const userUseCase = new userUseCase_1.DefaultUserUseCase();
        const isOTPValid = yield userUseCase.verifyOTP(email, otp);
        if (isOTPValid) {
            const { username, password } = req.body;
            yield userUseCase.createUserAfterVerification({ username, email, password });
            res.status(201).json({ message: 'Signup successful' });
        }
        else {
            res.status(401).json({ error: 'Invalid OTP' });
        }
    }
    catch (error) {
        console.error('Error in verifyOTPController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.verifyOTPController = verifyOTPController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userUseCase = new userUseCase_1.DefaultUserUseCase();
        const tokens = yield userUseCase.login(email, password);
        if (tokens) {
            // Send the access token in the response
            res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
            // Send any other information as needed
            res.status(200).json({ message: 'Login successful' });
        }
        else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.error('Error in loginController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.loginController = loginController;
