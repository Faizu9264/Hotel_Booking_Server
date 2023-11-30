"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValidationMiddleware = (req, res, next) => {
    var _a;
    const secretKey = process.env.JWT_SECRET || 'fallbackSecretKey';
    const authHeaderToken = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    const cookieToken = req.cookies.accessToken;
    const token = authHeaderToken || cookieToken;
    const refreshToken = req.cookies.refreshToken;
    if (!token && !refreshToken) {
        res.status(401).json({ error: 'Unauthorized - Missing Token' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            const newToken = jsonwebtoken_1.default.sign({ userId: decoded.userId, email: decoded.email }, secretKey, {
                expiresIn: '1h',
            });
            res.setHeader('Authorization', `Bearer ${newToken}`);
            res.cookie('accessToken', newToken, { httpOnly: true });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Error in token validation middleware:', error);
        res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }
};
exports.tokenValidationMiddleware = tokenValidationMiddleware;
