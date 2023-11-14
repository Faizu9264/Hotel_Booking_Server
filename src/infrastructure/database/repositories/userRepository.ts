// src/infrastructure/database/repositories/userRepository.ts
import UserModel, { UserDocument } from '../models/userModel';

class UserRepository {
  async create(user: Omit<UserDocument, '_id'>): Promise<UserDocument> {
    const newUser = new UserModel(user);
    return newUser.save();
  }

  async findOne(query: Record<string, any>): Promise<UserDocument | null> {
    return UserModel.findOne(query).exec();
  }
}

export default new UserRepository();
