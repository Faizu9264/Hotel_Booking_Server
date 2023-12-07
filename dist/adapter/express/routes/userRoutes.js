"use strict";
// src/adapter/express/routes/userRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inversify_config_1 = require("../../../usecase/inversify.config");
const RefreshTokenUseCase_1 = require("../../../usecase/RefreshTokenUseCase");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
const refreshTokenUseCase = inversify_config_1.container.get(RefreshTokenUseCase_1.RefreshTokenUseCase);
router.post('/signup', userController_1.sendOTPController);
router.post('/verify-otp', userController_1.verifyOTPController);
router.post('/complete-signup', userController_1.completeSignupController);
router.post('/login', userController_1.loginController);
router.post('/google-login', userController_1.googleLoginController);
router.post('/resend-otp', userController_1.resendOTPController);
// router.use( refreshTokenMiddleware(refreshTokenUseCase))
exports.default = router;
