"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/adapter/express/routes/hotelRoutes.ts
const express_1 = __importDefault(require("express"));
const hotelController_1 = require("../controllers/hotelController");
const tokenValidationMiddleware_1 = require("../middleware/tokenValidationMiddleware");
const router = express_1.default.Router();
router.use(tokenValidationMiddleware_1.tokenValidationMiddleware);
router.patch("/update/:hotelId", hotelController_1.updateHotelController);
router.post("/create", hotelController_1.createHotelController);
router.get("/all", hotelController_1.getAllHotelsController);
exports.default = router;
