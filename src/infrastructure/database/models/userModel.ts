// src/infrastructure/database/models/userModel.ts
import { Document, Schema, model } from 'mongoose';

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  phoneNumber?: string;
  isGoogle?:boolean;
  role: string;
  blocked?: boolean;
}

export interface UserDocument extends Document, Omit<User, '_id'> {}

const userSchema = new Schema<UserDocument>({
  _id: { type: String},
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String }, 
  phoneNumber: { type: String }, 
  role: { type: String, required: true, default: 'user' },
  blocked: { type: Boolean, default: false },
});

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
