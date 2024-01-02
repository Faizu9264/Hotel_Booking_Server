"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValidationMiddleware = (req, res, next) => {
    var _a;
    const secretKey = process.env.JWT_SECRET || undefined;
    if (!secretKey) {
        console.error('JWT_SECRET is not defined in the environment variables.');
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    const authHeaderToken = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    const token = authHeaderToken;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing Token' });
    }
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded) {
            console.error('Invalid token content.');
            return res.status(401).json({ error: 'Unauthorized - Invalid Token Content' });
        }
        if (decoded.role === 'admin' || decoded.role === 'user') {
            console.log('decoded', decoded);
            req.user = decoded;
            next();
        }
        else {
            return res.status(403).json({ error: 'Forbidden - Invalid Role' });
        }
    }
    catch (error) {
        console.error('Error in token validation middleware:', error);
        return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }
};
exports.tokenValidationMiddleware = tokenValidationMiddleware;
