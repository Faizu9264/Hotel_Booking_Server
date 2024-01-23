// src/adapter/express/routes/roomRoutes.ts
import express from "express";
import {
  createRoomController,
  getRoomByIdController,
  getAllRoomsController,
  updateRoomController,
  getRoomsByHotelIdController,
} from "../controllers/roomController";
import { tokenValidationMiddleware } from "../middleware/tokenValidationMiddleware";

const router = express.Router();
router.get("/all", getAllRoomsController);
router.get("/get/:roomId", getRoomByIdController);
router.get("/by-hotel/:hotelId", getRoomsByHotelIdController);
router.use(tokenValidationMiddleware);
router.post("/create", createRoomController);
router.patch("/update/:roomId", updateRoomController);

export default router;
