// src/domain/entities/Coupon.ts

export class Coupon {
  constructor(
    public code: string,
    public discountType: string,
    public discountAmount: number,
    public discountPercentage: number,
    public maxDiscount: number,
    public minCart: number,
    public expiryDate: string,
    public description: string,
    public couponCount: number,
    public createdAt: Date,
    public isApplied: boolean
  ) {}
}
