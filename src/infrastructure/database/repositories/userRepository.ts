// src/infrastructure/database/repositories/userRepository.ts
import UserModel, { UserDocument } from "../models/userModel";
import { Model } from "mongoose";
import mongoose from "mongoose";
class UserRepository {
  private userModel: Model<UserDocument>;

  constructor() {
    this.userModel = UserModel;
  }

  async create(user: Omit<UserDocument, "_id">): Promise<UserDocument> {
    const newUser = new this.userModel(user);

    if (!newUser._id) {
      newUser._id = new mongoose.Types.ObjectId().toString();
    }

    return newUser.save();
  }

  async findOne(query: Record<string, any>): Promise<UserDocument | null> {
    return this.userModel.findOne(query).exec();
  }

  async find(query: Record<string, any>): Promise<UserDocument[]> {
    return this.userModel.find(query).exec();
  }

  async findByIdAndUpdate(
    userId: string,
    updatedDetails: Partial<UserDocument>
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, updatedDetails).exec();
  }

  async updateWallet(
    userId: string,
    amount: number,
    paymentMethod: string
  ): Promise<void> {
    const date = new Date();
    await this.userModel
      .findByIdAndUpdate(userId, {
        $inc: { wallet: amount },
        $push: { walletTransactions: { amount, paymentMethod, date } },
      })
      .exec();
  }
  async deductMoneyFromWallet(
    userId: string,
    amount: number,
    paymentMethod: string
  ): Promise<void> {
    const date = new Date();
    await this.userModel
      .findByIdAndUpdate(userId, {
        $inc: { wallet: -amount },
        $push: { walletTransactions: { amount: -amount, paymentMethod, date } },
      })
      .exec();
  }
}

export default new UserRepository();
