"use strict";
// // src/infrastructure/database/repositories/userRepository.ts
// import UserModel, { UserDocument } from '../models/userModel';
// class UserRepository {
//   async create(user: Omit<UserDocument, '_id'>): Promise<UserDocument> {
//     const newUser = new UserModel(user);
//     return newUser.save();
//   }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//   async findOne(query: Record<string, any>): Promise<UserDocument | null> {
//     return UserModel.findOne(query).exec();
//   }
// }
// export default new UserRepository();
// src/infrastructure/database/repositories/userRepository.ts
const userModel_1 = __importDefault(require("../models/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
class UserRepository {
    constructor() {
        this.userModel = userModel_1.default;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new this.userModel(user);
            if (!newUser._id) {
                newUser._id = new mongoose_1.default.Types.ObjectId().toString();
            }
            return newUser.save();
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne(query).exec();
        });
    }
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.find(query).exec();
        });
    }
    findByIdAndUpdate(userId, updatedDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userModel.findByIdAndUpdate(userId, updatedDetails).exec();
        });
    }
}
exports.default = new UserRepository();
