"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/adapter/express/routes/roomRoutes.ts
const express_1 = __importDefault(require("express"));
const roomController_1 = require("../controllers/roomController");
const tokenValidationMiddleware_1 = require("../middleware/tokenValidationMiddleware");
const router = express_1.default.Router();
router.use(tokenValidationMiddleware_1.tokenValidationMiddleware);
router.post('/create', roomController_1.createRoomController);
router.get('/get/:roomId', roomController_1.getRoomByIdController);
router.get('/all', roomController_1.getAllRoomsController);
router.patch('/update/:roomId', roomController_1.updateRoomController);
router.get('/by-hotel/:hotelId', roomController_1.getRoomsByHotelIdController);
exports.default = router;
