// src/infrastructure/database/models/userModel.ts
import { Document, Schema, model } from 'mongoose';

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  isGoogle?:boolean;
}

export interface UserDocument extends Document, Omit<User, '_id'> {}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
