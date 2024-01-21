"use strict";
// src/domain/entities/Coupon.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
class Coupon {
    constructor(code, discountType, discountAmount, discountPercentage, maxDiscount, minCart, expiryDate, description, couponCount, createdAt, isApplied) {
        this.code = code;
        this.discountType = discountType;
        this.discountAmount = discountAmount;
        this.discountPercentage = discountPercentage;
        this.maxDiscount = maxDiscount;
        this.minCart = minCart;
        this.expiryDate = expiryDate;
        this.description = description;
        this.couponCount = couponCount;
        this.createdAt = createdAt;
        this.isApplied = isApplied;
    }
}
exports.Coupon = Coupon;
