"use strict";
// src/adapter/express/routes/userRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenValidationMiddleware_1 = require("../middleware/tokenValidationMiddleware");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/signup', userController_1.sendOTPController);
router.post('/verify-otp', userController_1.verifyOTPController);
router.post('/complete-signup', userController_1.completeSignupController);
router.post('/login', userController_1.loginController);
router.post('/google-login', userController_1.googleLoginController);
router.post('/resend-otp', userController_1.resendOTPController);
router.use(tokenValidationMiddleware_1.tokenValidationMiddleware);
router.patch('/:userId/update-profile', userController_1.updateProfileController);
router.patch('/:userId/change-password', userController_1.changePasswordController);
exports.default = router;
