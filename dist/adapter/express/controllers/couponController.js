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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCouponsController = exports.editCouponController = exports.addCouponController = void 0;
const CouponUseCase_1 = require("../../../usecase/CouponUseCase");
const CouponRepository_1 = require("../../../infrastructure/database/repositories/CouponRepository");
const couponModel_1 = __importDefault(require("../../../infrastructure/database/models/couponModel"));
const couponRepository = new CouponRepository_1.CouponRepository(couponModel_1.default);
const couponUseCase = new CouponUseCase_1.CouponUseCase(couponRepository);
const addCouponController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const couponData = req.body;
        console.log("couponData ", couponData);
        const addedCoupon = yield couponUseCase.addCoupon(couponData);
        res.status(201).json(addedCoupon);
    }
    catch (error) {
        console.error("Error adding coupon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addCouponController = addCouponController;
const editCouponController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { couponId } = req.params;
        const updatedDetails = req.body;
        const editedCoupon = yield couponUseCase.editCoupon(couponId, updatedDetails);
        if (editedCoupon) {
            res.status(200).json(editedCoupon);
        }
        else {
            res.status(404).json({ error: "Coupon not found" });
        }
    }
    catch (error) {
        console.error("Error editing coupon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.editCouponController = editCouponController;
const getAllCouponsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCoupons = yield couponUseCase.getAllCoupons();
        res.status(200).json(allCoupons);
    }
    catch (error) {
        console.error("Error getting all coupons:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllCouponsController = getAllCouponsController;
