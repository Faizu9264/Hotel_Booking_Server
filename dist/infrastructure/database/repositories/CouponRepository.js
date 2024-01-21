"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRepository = void 0;
class CouponRepository {
    constructor(couponModel) {
        this.couponModel = couponModel;
    }
    addCoupon(coupon) {
        return __awaiter(this, void 0, void 0, function* () {
            const addedCoupon = yield this.couponModel.create(coupon);
            return addedCoupon.toObject();
        });
    }
    editCoupon(couponId, updatedDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const editedCoupon = yield this.couponModel
                .findByIdAndUpdate(couponId, { $set: updatedDetails }, { new: true })
                .lean()
                .exec();
            return editedCoupon;
        });
    }
    getAllCoupons() {
        return __awaiter(this, void 0, void 0, function* () {
            const allCoupons = yield this.couponModel
                .find()
                .sort({ createdAt: -1 })
                .lean()
                .exec();
            return allCoupons;
        });
    }
}
exports.CouponRepository = CouponRepository;
