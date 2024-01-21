// src/adapter/express/routes/adminRoutes.ts
import express from "express";
import {
  adminLoginController,
  getAllUsersController,
  editUserController,
  blockUserController,
  unblockUserController,
  RefundController,
} from "../controllers/adminController";
import {
  getAllBookingsController,
  cancelBookingController,
  approveBookingController,
} from "../controllers/bookingController";
import { tokenValidationMiddleware } from "../middleware/tokenValidationMiddleware";
import {
  addCouponController,
  editCouponController,
  getAllCouponsController,
} from "../controllers/couponController";

const router = express.Router();

router.post("/login", adminLoginController);
router.use(tokenValidationMiddleware);
router.get("/users", getAllUsersController);
router.patch("/user/edit/:userId", editUserController);
router.patch("/user/block/:userId", blockUserController);
router.patch("/user/unblock/:userId", unblockUserController);
router.get("/allBookings", getAllBookingsController);
router.patch("/cancel/:bookingId", cancelBookingController);
router.patch("/approve/:bookingId", approveBookingController);

router.post("/add-coupon", addCouponController);
router.patch("/edit-coupon/:couponId", editCouponController);
router.get("/get-all-coupons", getAllCouponsController);
router.post("/refund-booking", RefundController);

export default router;
