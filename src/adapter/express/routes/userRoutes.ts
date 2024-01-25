// src/adapter/express/routes/userRoutes.ts

import express from "express";
import { tokenValidationMiddleware } from "../middleware/tokenValidationMiddleware";
import {
  sendOTPController,
  verifyOTPController,
  completeSignupController,
  loginController,
  googleLoginController,
  resendOTPController,
  updateProfileController,
  changePasswordController,
  checkoutController,
  AddMoneyController,
  AddToWalletWebhook,
  getWalletDetailsController,
  RefundController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/userController";
import { cancelBookingController } from "../controllers/bookingController";
import { handleWebhookEvent } from "../controllers/bookingController";
import { getAllCouponsController } from "../controllers/couponController";
import {
  addReviewController,
  getAllReviewsController,
} from "../controllers/hotelController";

const app = express();
app.use(express.static("public"));

const router = express.Router();

router.post("/signup", sendOTPController);
router.post("/verify-otp", verifyOTPController);
router.post("/complete-signup", completeSignupController);
router.post("/login", loginController);
router.post("/google-login", googleLoginController);
router.post("/resend-otp", resendOTPController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);
router.post("/webhook", handleWebhookEvent);
router.post("/webhook-addtowallet", AddToWalletWebhook);
router.get("/all-reviews", getAllReviewsController);
router.use(tokenValidationMiddleware);
router.patch("/:userId/update-profile", updateProfileController);
router.patch("/:userId/change-password", changePasswordController);
router.post("/checkout", checkoutController);
router.patch("/cancelBooking/:bookingId", cancelBookingController);
router.get("/get-all-coupons", getAllCouponsController);
router.post("/add-money", AddMoneyController);
router.get("/wallet/:userId", getWalletDetailsController);
router.post("/:hotelId/add-review", addReviewController);
router.post("/refund-booking", RefundController);
export default router;
