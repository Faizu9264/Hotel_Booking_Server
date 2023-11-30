"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCase = void 0;
// src/usecase/RefreshTokenUseCase.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inversify_1 = require("inversify");
const authUtils_1 = require("../infrastructure/utils/authUtils");
let RefreshTokenUseCase = class RefreshTokenUseCase {
    execute(refreshToken, role) {
        try {
            // Verify the refresh token
            const decoded = jsonwebtoken_1.default.verify(refreshToken, authUtils_1.secretKey);
            const newAccessToken = jsonwebtoken_1.default.sign({ userId: decoded.userId, email: decoded.email, role }, authUtils_1.secretKey, {
                expiresIn: '1h',
            });
            return newAccessToken;
        }
        catch (error) {
            console.error('Error refreshing access token:', error);
            return null;
        }
    }
};
exports.RefreshTokenUseCase = RefreshTokenUseCase;
exports.RefreshTokenUseCase = RefreshTokenUseCase = __decorate([
    (0, inversify_1.injectable)()
], RefreshTokenUseCase);
