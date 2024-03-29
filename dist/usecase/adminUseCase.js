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
exports.DefaultAdminUseCase = void 0;
const adminRepository_1 = __importDefault(require("../infrastructure/database/repositories/adminRepository"));
const userRepository_1 = __importDefault(require("../infrastructure/database/repositories/userRepository"));
const authUtils_1 = require("../infrastructure/utils/authUtils");
class DefaultAdminUseCase {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield adminRepository_1.default.findOne({ email: email.toLowerCase() });
            console.log("Admin:", admin);
            console.log("Entered password:", password);
            console.log("Hashed password in the database:", admin === null || admin === void 0 ? void 0 : admin.password);
            if (admin) {
                console.log("Entered password:", password);
                console.log("Hashed password in the database:", admin.password);
                const isPasswordMatch = yield (0, authUtils_1.comparePasswords)(password, admin.password);
                console.log("Password match result:", isPasswordMatch);
                if (isPasswordMatch) {
                    const accessToken = (0, authUtils_1.generateAccessToken)(admin, "admin");
                    return { accessToken };
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userRepository_1.default.find({});
                return users;
            }
            catch (error) {
                console.error("Error getting all users:", error);
                throw error;
            }
        });
    }
    editUserById(userId, updatedDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userRepository_1.default.findByIdAndUpdate(userId, updatedDetails);
            }
            catch (error) {
                console.error("Error editing user:", error);
                throw error;
            }
        });
    }
    blockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository_1.default.findOne({ _id: userId });
                if (!user) {
                    throw new Error(`User with ID ${userId} not found`);
                }
                if (user.blocked) {
                    throw new Error(`User with ID ${userId} is already blocked`);
                }
                yield userRepository_1.default.findByIdAndUpdate(userId, { blocked: true });
            }
            catch (error) {
                console.error("Error blocking user:", error);
                throw error;
            }
        });
    }
    getAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return adminRepository_1.default.findOne({ email });
        });
    }
    unblockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository_1.default.findOne({ _id: userId });
                if (!user) {
                    throw new Error(`User with ID ${userId} not found`);
                }
                if (!user.blocked) {
                    throw new Error(`User with ID ${userId} is not blocked`);
                }
                yield userRepository_1.default.findByIdAndUpdate(userId, { blocked: false });
            }
            catch (error) {
                console.error("Error unblocking user:", error);
                throw error;
            }
        });
    }
    addToWallet(userId, amount, payment_method) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userRepository_1.default.updateWallet(userId, amount, payment_method);
            }
            catch (error) {
                console.error("Error updating user wallet:", error);
                throw new Error("Error updating user wallet");
            }
        });
    }
}
exports.DefaultAdminUseCase = DefaultAdminUseCase;
