// src/adapter/express/routes/hotelRoutes.ts
import express from "express";
import {
  createHotelController,
  getAllHotelsController,
  updateHotelController,
} from "../controllers/hotelController";
import { tokenValidationMiddleware } from "../middleware/tokenValidationMiddleware";

const router = express.Router();

router.use(tokenValidationMiddleware);
router.patch("/update/:hotelId", updateHotelController);
router.post("/create", createHotelController);
router.get("/all", getAllHotelsController);

export default router;
