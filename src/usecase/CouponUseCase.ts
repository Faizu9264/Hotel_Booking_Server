// src/usecase/CouponUseCase.ts

import { inject, injectable } from "inversify";
import { CouponService } from "../domain/services/CouponService";
import { Coupon } from "../domain/entities/Coupon";

@injectable()
export class CouponUseCase {
  constructor(
    @inject("CouponService") private readonly couponService: CouponService
  ) {}

  async addCoupon(couponData: any): Promise<Coupon> {
    return this.couponService.addCoupon(couponData);
  }

  async editCoupon(
    couponId: string,
    updatedDetails: Partial<Coupon>
  ): Promise<Coupon | null> {
    return this.couponService.editCoupon(couponId, updatedDetails);
  }

  async getAllCoupons(): Promise<Coupon[]> {
    return this.couponService.getAllCoupons();
  }
}
