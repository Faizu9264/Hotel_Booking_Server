"use strict";
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
    updateWallet(userId, amount, paymentMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            yield this.userModel
                .findByIdAndUpdate(userId, {
                $inc: { wallet: amount },
                $push: { walletTransactions: { amount, paymentMethod, date } },
            })
                .exec();
        });
    }
    deductMoneyFromWallet(userId, amount, paymentMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            yield this.userModel
                .findByIdAndUpdate(userId, {
                $inc: { wallet: -amount },
                $push: { walletTransactions: { amount: -amount, paymentMethod, date } },
            })
                .exec();
        });
    }
}
exports.default = new UserRepository();
