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
exports.comparePasswords = exports.hashPassword = exports.generateRefreshToken = exports.generateAccessToken = exports.secretKey = void 0;
// src/infrastructure/utils/authUtils.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secretKey = process.env.JWT_SECRET || 'fallbackSecretKey';
const generateAccessToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, exports.secretKey, {
        expiresIn: '1h',
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, exports.secretKey, {
        expiresIn: '7d',
    });
    return token;
};
exports.generateRefreshToken = generateRefreshToken;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Password to hash:', password);
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        console.log('Hashed Password:', hashedPassword);
        return hashedPassword;
    }
    catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
});
exports.hashPassword = hashPassword;
const comparePasswords = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield bcrypt_1.default.compare(password, hashedPassword);
    return match;
});
exports.comparePasswords = comparePasswords;
