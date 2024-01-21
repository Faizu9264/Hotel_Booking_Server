import { UserDocument } from "../../domain/entities/User";
export interface WalletTransaction {
  amount: number;
  paymentMethod: string;
  date: Date;
}

export interface UserUseCase {
  signUp(user: UserDocument): Promise<string>;
  login(username: string, password: string): Promise<string | null>;
  updateProfile(
    userId: string,
    updatedData: Partial<UserDocument>
  ): Promise<UserDocument | null>;
  changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<boolean>;
  resetPassword(email: string, newPassword: string): Promise<boolean>;
  addToWallet(userId: string, amount: number): Promise<void>;
  getWalletDetails(
    userId: string
  ): Promise<{ walletAmount: number; walletTransactions: WalletTransaction[] }>;
}
