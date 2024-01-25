// src/adapter/express/routes/hotelRoutes.ts
import express from "express";
import {
  createHotelController,
  updateHotelController,
} from "../controllers/hotelController";
import { tokenValidationMiddleware } from "../middleware/tokenValidationMiddleware";

const router = express.Router();


router.use(tokenValidationMiddleware);
router.patch("/update/:hotelId", updateHotelController);
router.post("/create", createHotelController);

export default router;
