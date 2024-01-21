// src/infrastructure/database/repositories/CouponRepository.ts
import { Model, Document } from "mongoose";
import { Coupon } from "../../../domain/entities/Coupon";

export class CouponRepository {
  private readonly couponModel: Model<Document & Coupon>;

  constructor(couponModel: Model<Document & Coupon>) {
    this.couponModel = couponModel;
  }

  async addCoupon(coupon: Coupon): Promise<Coupon> {
    const addedCoupon = await this.couponModel.create(coupon);
    return addedCoupon.toObject() as Coupon;
  }

  async editCoupon(
    couponId: string,
    updatedDetails: Partial<Coupon>
  ): Promise<Coupon | null> {
    const editedCoupon = await this.couponModel
      .findByIdAndUpdate(couponId, { $set: updatedDetails }, { new: true })
      .lean()
      .exec();

    return editedCoupon as Coupon | null;
  }

  async getAllCoupons(): Promise<Coupon[]> {
    const allCoupons = await this.couponModel
      .find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return allCoupons as Coupon[];
  }
}
