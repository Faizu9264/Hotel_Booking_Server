// src/adapter/express/controllers/adminController.ts
import { Request, Response } from "express";
import { AdminUseCase } from "../../../usecase/interfaces/AdminUseCase";
import { DefaultAdminUseCase } from "../../../usecase/adminUseCase";
import { generateAccessToken } from "../../../infrastructure/utils/authUtils";
import { AdminDocument } from "../../../domain/entities/Admin";

export const adminLoginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const adminUseCase: AdminUseCase = new DefaultAdminUseCase();
    const tokenPair = await adminUseCase.login(email, password);

    if (tokenPair) {
      const accessToken = generateAccessToken(
        { email } as AdminDocument,
        "admin"
      );
      const admin = await adminUseCase.getAdminByEmail(email);
      res
        .status(200)
        .json({ message: "Admin login successful", admin, accessToken });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in adminLoginController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUsersController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const adminUseCase: AdminUseCase = new DefaultAdminUseCase();
    const users = await adminUseCase.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsersController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const updatedDetails = req.body;

    const adminUseCase: AdminUseCase = new DefaultAdminUseCase();
    await adminUseCase.editUserById(userId, updatedDetails);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error in editUserController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const blockUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const adminUseCase: AdminUseCase = new DefaultAdminUseCase();
    await adminUseCase.blockUser(userId);

    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    console.error("Error in blockUserController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const unblockUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const adminUseCase: AdminUseCase = new DefaultAdminUseCase();
    await adminUseCase.unblockUser(userId);

    res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    console.error("Error in unblockUserController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const RefundController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, data } = req.body;
    data.payment_method = data.paymentMethod;

    const adminUseCase = new DefaultAdminUseCase();
    await adminUseCase.addToWallet(userId, data.amount, data.payment_method);

    res.status(200).json({ message: "refund successful" });
  } catch (error: any) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
