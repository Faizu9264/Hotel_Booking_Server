// src/usecase/adminUseCase.ts
import { AdminUseCase } from "./interfaces/AdminUseCase";
import AdminRepository from "../infrastructure/database/repositories/adminRepository";
import UserRepository from "../infrastructure/database/repositories/userRepository";
import {
  comparePasswords,
  generateAccessToken,
} from "../infrastructure/utils/authUtils";
import { UserDocument } from "../domain/entities/User";

export class DefaultAdminUseCase implements AdminUseCase {
  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string } | null> {
    const admin = await AdminRepository.findOne({ email: email.toLowerCase() });

    console.log("Admin:", admin);
    console.log("Entered password:", password);
    console.log("Hashed password in the database:", admin?.password);

    if (admin) {
      console.log("Entered password:", password);
      console.log("Hashed password in the database:", admin.password);
      const isPasswordMatch = await comparePasswords(password, admin.password);
      console.log("Password match result:", isPasswordMatch);

      if (isPasswordMatch) {
        const accessToken = generateAccessToken(admin, "admin");

        return { accessToken };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async getAllUsers(): Promise<UserDocument[]> {
    try {
      const users = await UserRepository.find({});
      return users;
    } catch (error) {
      console.error("Error getting all users:", error);
      throw error;
    }
  }

  async editUserById(
    userId: string,
    updatedDetails: Partial<UserDocument>
  ): Promise<void> {
    try {
      await UserRepository.findByIdAndUpdate(userId, updatedDetails);
    } catch (error) {
      console.error("Error editing user:", error);
      throw error;
    }
  }

  async blockUser(userId: string): Promise<void> {
    try {
      const user = await UserRepository.findOne({ _id: userId });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      if (user.blocked) {
        throw new Error(`User with ID ${userId} is already blocked`);
      }

      await UserRepository.findByIdAndUpdate(userId, { blocked: true });
    } catch (error) {
      console.error("Error blocking user:", error);
      throw error;
    }
  }
  async getAdminByEmail(email: string): Promise<UserDocument | null> {
    return AdminRepository.findOne({ email });
  }
  async unblockUser(userId: string): Promise<void> {
    try {
      const user = await UserRepository.findOne({ _id: userId });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      if (!user.blocked) {
        throw new Error(`User with ID ${userId} is not blocked`);
      }

      await UserRepository.findByIdAndUpdate(userId, { blocked: false });
    } catch (error) {
      console.error("Error unblocking user:", error);
      throw error;
    }
  }

  async addToWallet(
    userId: string,
    amount: number,
    payment_method: string
  ): Promise<void> {
    try {
      await UserRepository.updateWallet(userId, amount, payment_method);
    } catch (error) {
      console.error("Error updating user wallet:", error);
      throw new Error("Error updating user wallet");
    }
  }
}
