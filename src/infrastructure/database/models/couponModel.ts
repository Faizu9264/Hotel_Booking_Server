// src/infrastructure/database/models/couponModel.ts
import mongoose, { Document, Schema } from "mongoose";

export interface CouponModel extends Document {
  code: string;
  discountType: string;
  discountAmount: number;
  discountPercentage: number;
  maxDiscount: number;
  minCart: number;
  expiryDate: string;
  description: string;
  couponCount: number;
  createdAt: Date;
  isApplied: boolean;
}

const couponSchema = new Schema<CouponModel>({
  code: { type: String, required: true },
  discountType: { type: String, required: true },
  discountAmount: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  maxDiscount: { type: Number, required: true },
  minCart: { type: Number, required: true },
  expiryDate: { type: String, required: true },
  description: { type: String, required: true },
  couponCount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  isApplied: { type: Boolean, default: true },
});

const CouponModel = mongoose.model<CouponModel>("Coupon", couponSchema);

export default CouponModel;
