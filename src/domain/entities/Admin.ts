// src/domain/entities/AdminEntity.ts
import { Document } from "mongoose";
export interface AdminDocument extends Document {
  _id?: string;
  email: string;
  password: string;
}
export interface TokenPayload {
  _id: string;
  email: string;
}
