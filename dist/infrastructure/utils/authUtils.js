"use strict";
// src/infrastructure/utils/authUtils.ts
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
exports.comparePasswords = exports.hashPassword = exports.generateAccessToken = exports.secretKey = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secretKey = process.env.JWT_SECRET || "fallbackSecretKey";
const generateAccessToken = (user, role) => {
    var _a;
    const token = jsonwebtoken_1.default.sign({ userId: (_a = user._id) === null || _a === void 0 ? void 0 : _a.toString(), email: user.email, role }, exports.secretKey, {
        expiresIn: "1h",
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        throw error;
    }
});
exports.hashPassword = hashPassword;
const comparePasswords = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield bcrypt_1.default.compare(password, hashedPassword);
    return match;
});
exports.comparePasswords = comparePasswords;
