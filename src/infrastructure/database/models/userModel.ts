// src/infrastructure/database/models/userModel.ts
import { Document, Schema, model } from "mongoose";

export interface WalletTransaction {
  amount: number;
  paymentMethod: string;
  date: Date;
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  phoneNumber?: string;
  wallet?: number;
  isGoogle?: boolean;
  role: string;
  blocked?: boolean;
  walletTransactions?: WalletTransaction[];
}

export interface UserDocument extends Document, Omit<User, "_id"> {}

const walletTransactionSchema = new Schema<WalletTransaction>({
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const userSchema = new Schema<UserDocument>({
  _id: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  phoneNumber: { type: String },
  wallet: { type: Number, default: 0 },
  role: { type: String, required: true, default: "user" },
  blocked: { type: Boolean, default: false },
  walletTransactions: { type: [walletTransactionSchema], default: [] },
});

const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
