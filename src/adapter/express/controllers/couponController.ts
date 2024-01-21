// src/adapter/express/controllers/couponController.ts
import { Request, Response } from "express";
import { CouponUseCase } from "../../../usecase/CouponUseCase";
import { CouponRepository } from "../../../infrastructure/database/repositories/CouponRepository";
import couponModel from "../../../infrastructure/database/models/couponModel";

const couponRepository = new CouponRepository(couponModel);
const couponUseCase = new CouponUseCase(couponRepository);

export const addCouponController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const couponData = req.body;
    console.log("couponData ", couponData);

    const addedCoupon = await couponUseCase.addCoupon(couponData);
    res.status(201).json(addedCoupon);
  } catch (error) {
    console.error("Error adding coupon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editCouponController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { couponId } = req.params;
    const updatedDetails = req.body;
    const editedCoupon = await couponUseCase.editCoupon(
      couponId,
      updatedDetails
    );
    if (editedCoupon) {
      res.status(200).json(editedCoupon);
    } else {
      res.status(404).json({ error: "Coupon not found" });
    }
  } catch (error) {
    console.error("Error editing coupon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllCouponsController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const allCoupons = await couponUseCase.getAllCoupons();
    res.status(200).json(allCoupons);
  } catch (error) {
    console.error("Error getting all coupons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
