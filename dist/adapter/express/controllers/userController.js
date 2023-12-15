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
exports.changePasswordController = exports.updateProfileController = exports.resendOTPController = exports.googleLoginController = exports.loginController = exports.completeSignupController = exports.verifyOTPController = exports.sendOTPController = void 0;
const userUseCase_1 = require("../../../usecase/userUseCase");
const defaultOTPService_1 = require("../../../usecase/otp/defaultOTPService");
const defaultOTPRepository_1 = __importDefault(require("../../../usecase/otp/defaultOTPRepository"));
const authUtils_1 = require("../../../infrastructure/utils/authUtils");
const otpRepository = new defaultOTPRepository_1.default();
const otpService = new defaultOTPService_1.DefaultOTPService(otpRepository);
const sendOTPController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const userUseCase = new userUseCase_1.DefaultUserUseCase();
        yield userUseCase.sendOTP(email);
        res.status(200).json({ message: 'OTP sent successfully' });
    }
    catch (error) {
        console.error('Error in sendOTPController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.sendOTPController = sendOTPController;
const verifyOTPController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        console.log('Received data:', email, otp);
        // const userUseCase = new DefaultUserUseCase();
        const isOTPValid = yield otpService.verifyOTP(email, otp);
        if (isOTPValid) {
            console.log('OTP is valid....');
            res.status(200).json({ message: 'OTP verification successful' });
        }
        else {
            console.log('Invalid OTP');
            res.status(401).json({ error: 'Invalid OTP' });
        }
    }
    catch (error) {
        console.error('Error in verifyOTPController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.verifyOTPController = verifyOTPController;
const completeSignupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        console.log('Received data for complete signup:', { username, email, password });
        const userUseCase = new userUseCase_1.DefaultUserUseCase();
        yield userUseCase.createUserAfterVerification({ username, email, password });
        res.status(201).json({ message: 'Signup successful' });
    }
    catch (error) {
        console.error('Error in completeSignupController:', error);
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            const duplicateField = Object.keys(error.keyPattern)[0];
            const duplicateValue = error.keyValue[duplicateField];
            res.status(400).json({
                error: ` The ${duplicateField} '${duplicateValue}' is already in use.`,
            });
        }
        else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
exports.completeSignupController = completeSignupController;
// Import necessary modules and classes
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log('Received login credentials:', email, password);
        const userUseCase = new userUseCase_1.DefaultUserUseCase();
        const user = yield userUseCase.getUserByEmail(email);
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const tokens = yield userUseCase.login(email, password);
        if (tokens) {
            const isSecureCookie = process.env.COOKIE_SECURE === 'true';
            res.status(200).json({
                message: 'Login successful',
                accessToken: (0, authUtils_1.generateAccessToken)(user, 'user'),
                user: {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    profileImage: user.profileImage,
                    blocked: user.blocked,
                    role: 'user',
                },
            });
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
const googleLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('inside googleLoginController');
    try {
        const { _id, email, username, token } = req.body;
        console.log('email, username,token', email, username, token);
        const userUseCase = new userUseCase_1.DefaultUserUseCase();
        const existingUser = yield userUseCase.getUserByEmail(email);
        console.log('existingUser', existingUser);
        if (existingUser) {
            const accessToken = (0, authUtils_1.generateAccessToken)(existingUser, 'user');
            res.status(200).json({ message: 'Login successful', accessToken });
        }
        else {
            // Use the token as the user ID
            const newUser = { _id: _id, email, username, password: token };
            yield userUseCase.createUserAfterVerification(newUser);
            const getUser = yield userUseCase.getUserByEmail(email);
            const accessToken = (0, authUtils_1.generateAccessToken)(getUser, 'user');
            res.status(201).json({ message: 'Signup successful', accessToken });
        }
    }
    catch (error) {
        console.error('Error in googleLoginController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.googleLoginController = googleLoginController;
const resendOTPController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const userUseCase = new userUseCase_1.DefaultUserUseCase();
        yield userUseCase.resendOTP(email);
        res.status(200).json({ message: 'Resent OTP successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.resendOTPController = resendOTPController;
const updateProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        // Check if userId is not defined
        if (userId === undefined) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        const updatedData = req.body;
        console.log('body', updatedData);
        const userUseCase = new userUseCase_1.DefaultUserUseCase();
        // Check if userId is a valid ObjectId, if not, consider it as a token
        // if (!mongoose.Types.ObjectId.isValid(userId)) {
        //   const user = await userUseCase.getUserByToken(userId);
        //   if (!user || user._id === undefined) {
        //     res.status(404).json({ error: 'User not found' });
        //     return;
        //   }
        //   const updatedUser = await userUseCase.updateProfile(user._id, updatedData);
        //   console.log('updatedUser ', updatedUser);
        //   if (updatedUser) {
        //     res.status(200).json(updatedUser);
        //   } else {
        //     res.status(404).json({ error: 'User not found' });
        //   }
        // } else 
        {
            const updatedUser = yield userUseCase.updateProfile(userId, updatedData);
            console.log('updatedUser ', updatedUser);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            }
            else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    }
    catch (error) {
        console.error('Error in updateProfileController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateProfileController = updateProfileController;
const changePasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { currentPassword, newPassword } = req.body;
        const userUseCase = new userUseCase_1.DefaultUserUseCase();
        const isPasswordChanged = yield userUseCase.changePassword(userId, currentPassword, newPassword);
        if (isPasswordChanged) {
            res.status(200).json({ message: 'Password changed successfully' });
        }
        else {
            res.status(401).json({ error: 'Invalid current password' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.changePasswordController = changePasswordController;
