// src/domain/services/DefaultCouponService.ts

import { inject, injectable } from "inversify";
import { CouponRepository } from "../../infrastructure/database/repositories/CouponRepository";
import { Coupon } from "../entities/Coupon";
import { CouponService } from "./CouponService";

@injectable()
export class DefaultCouponService implements CouponService {
  constructor(
    @inject("CouponRepository")
    private readonly couponRepository: CouponRepository
  ) {}

  async addCoupon(coupon: Coupon): Promise<Coupon> {
    coupon.createdAt = new Date();
    return this.couponRepository.addCoupon(coupon);
  }

  async editCoupon(
    couponId: string,
    updatedDetails: Partial<Coupon>
  ): Promise<Coupon | null> {
    return this.couponRepository.editCoupon(couponId, updatedDetails);
  }

  async getAllCoupons(): Promise<Coupon[]> {
    return this.couponRepository.getAllCoupons();
  }
}
