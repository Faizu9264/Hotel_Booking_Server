// src/domain/services/CouponService.ts
import { Coupon } from "../entities/Coupon";

export interface CouponService {
  addCoupon(coupon: Coupon): Promise<Coupon>;
  editCoupon(
    couponId: string,
    updatedDetails: Partial<Coupon>
  ): Promise<Coupon | null>;
  getAllCoupons(): Promise<Coupon[]>;
}
