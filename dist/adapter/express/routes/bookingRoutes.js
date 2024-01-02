"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/adapter/express/routes/bookingRoutes.ts
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const tokenValidationMiddleware_1 = require("../middleware/tokenValidationMiddleware");
const router = express_1.default.Router();
router.use(tokenValidationMiddleware_1.tokenValidationMiddleware);
router.post('/create', bookingController_1.createBookingController);
router.get('/:userId', bookingController_1.getBookingsByUserController);
exports.default = router;
