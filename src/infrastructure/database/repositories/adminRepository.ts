// src/infrastructure/database/repositories/adminRepository.ts
import { model, Schema } from "mongoose";
import { AdminDocument } from "../../../domain/entities/Admin";

const adminSchema = new Schema<AdminDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model<AdminDocument>("Admin", adminSchema);
