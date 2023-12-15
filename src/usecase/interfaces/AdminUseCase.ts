// src/usecase/interfaces/AdminUseCase.ts
import { UserDocument } from '../../domain/entities/User'; 
export interface AdminUseCase {
  login(email: string, password: string): Promise<{ accessToken: string;} | null>;
  getAllUsers(): Promise<UserDocument[]>;
  editUserById(userId: string, updatedDetails: Partial<UserDocument>): Promise<void>;
  blockUser(userId: string): Promise<void>;
  unblockUser(userId: string): Promise<void>;
}
