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
            const otp = yield this.otpService.sendOTP(email);
            console.log("otp:", otp);
            return { message: "OTP sent successfully" };
        });
    }
    createUserAfterVerification(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = user;
                const hashedPassword = yield (0, authUtils_1.hashPassword)(password);
                const newUser = yield userRepository_1.default.create(Object.assign(Object.assign({}, user), { email, password: hashedPassword, role: "user" }));
                console.log("New User Created:", newUser);
                return { message: "Signup successful" };
            }
            catch (error) {
                console.error("Error creating user after verification:", error);
                throw error;
            }
        });
    }
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = yield this.otpService.sendOTP(user.email);
                console.log("OTP sent for verification:", otp);
                return { message: "OTP sent for verification" };
            }
            catch (error) {
                console.error("Error sending OTP:", error);
                throw new Error("Error sending OTP");
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield userRepository_1.default.findOne({ email });
            if (existingUser &&
                (yield (0, authUtils_1.comparePasswords)(password, existingUser.password))) {
                const accessToken = (0, authUtils_1.generateAccessToken)(existingUser, "user");
                return { accessToken };
            }
            else {
                return null;
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return userRepository_1.default.findOne({ email });
        });
    }
    resendOTP(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.otpService.resendOTP(email);
                return { message: "Resent OTP successfully" };
            }
            catch (error) {
                console.error("Error resending OTP:", error);
                throw new Error("Error resending OTP");
            }
        });
    }
    updateProfile(userId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository_1.default.findOne({ _id: userId });
                if (!user) {
                    console.log("User not found");
                    return null;
                }
                Object.assign(user, updatedData);
                const updatedUser = yield user.save();
                console.log("Updated user:", updatedUser);
                return updatedUser;
            }
            catch (error) {
                console.error("Error updating profile:", error);
                throw error;
            }
        });
    }
    changePassword(userId, currentPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository_1.default.findOne({ _id: userId });
                if (!user) {
                    return false;
                }
                const isCurrentPasswordValid = yield (0, authUtils_1.comparePasswords)(currentPassword, user.password);
                if (!isCurrentPasswordValid) {
                    return false;
                }
                user.password = yield (0, authUtils_1.hashPassword)(newPassword);
                yield user.save();
                return true;
            }
            catch (error) {
                console.error("Error changing password:", error);
                throw error;
            }
        });
    }
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return userRepository_1.default.findOne({ _id: token });
        });
    }
    addToWallet(userId, amount, payment_method) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("1");
                yield userRepository_1.default.updateWallet(userId, amount, payment_method);
            }
            catch (error) {
                console.error("Error updating user wallet:", error);
                throw new Error("Error updating user wallet");
            }
        });
    }
    getWalletDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository_1.default.findOne({ _id: userId });
            return {
                walletAmount: user ? user.wallet || 0 : 0,
                walletTransactions: user ? user.walletTransactions || [] : [],
            };
        });
    }
    updateWalletAfterPayment(userId, amount, paymentMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Updating wallet after payment");
                yield userRepository_1.default.deductMoneyFromWallet(userId, amount, paymentMethod);
            }
            catch (error) {
                console.error("Error updating wallet after payment:", error);
                throw new Error("Error updating wallet after payment");
            }
        });
    }
    resetPassword(email, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository_1.default.findOne({ email: email });
                if (!user) {
                    return false;
                }
                console.log("newPassword", newPassword);
                user.password = yield (0, authUtils_1.hashPassword)(newPassword);
                yield user.save();
                return true;
            }
            catch (error) {
                console.error("Error changing password:", error);
                throw error;
            }
        });
    }
}
exports.DefaultUserUseCase = DefaultUserUseCase;
