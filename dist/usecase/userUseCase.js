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
exports.DefaultUserUseCase = void 0;
const userRepository_1 = __importDefault(require("../infrastructure/database/repositories/userRepository"));
const authUtils_1 = require("../infrastructure/utils/authUtils");
const defaultOTPService_1 = require("./otp/defaultOTPService");
const defaultOTPRepository_1 = __importDefault(require("./otp/defaultOTPRepository"));
class DefaultUserUseCase {
    constructor() {
        const otpRepository = new defaultOTPRepository_1.default();
        this.otpService = new defaultOTPService_1.DefaultOTPService(otpRepository);
    }
    sendOTP(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = this.otpService.generateOTP();
            this.otpService.storeOTP(email, otp);
            yield this.otpService.sendOTP(email, otp);
            return { message: 'OTP sent successfully' };
        });
    }
    verifyOTP(email, userEnteredOTP) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedOTP = this.otpService.getStoredOTP(email);
            return storedOTP === userEnteredOTP;
        });
    }
    createUserAfterVerification(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, authUtils_1.hashPassword)(user.password);
            const newUser = yield userRepository_1.default.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            return { message: 'Signup successful' };
        });
    }
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = this.otpService.generateOTP();
            this.otpService.storeOTP(user.email, otp);
            this.otpService.sendOTP(user.email, otp);
            return { message: 'OTP sent for verification' };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield userRepository_1.default.findOne({ email });
            if (existingUser && (yield (0, authUtils_1.comparePasswords)(password, existingUser.password))) {
                const accessToken = (0, authUtils_1.generateAccessToken)(existingUser);
                const refreshToken = (0, authUtils_1.generateRefreshToken)(existingUser);
                return { accessToken, refreshToken };
            }
            else {
                return null;
            }
        });
    }
}
exports.DefaultUserUseCase = DefaultUserUseCase;
