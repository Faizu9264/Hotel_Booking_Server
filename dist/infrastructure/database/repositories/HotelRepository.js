"use strict";
// src/infrastructure/database/repositories/HotelRepository.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRepository = void 0;
class HotelRepository {
    constructor(hotelModel) {
        this.hotelModel = hotelModel;
    }
    createHotel(hotel) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdHotel = yield this.hotelModel.create(hotel);
            return createdHotel.toObject();
        });
    }
    getAllHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            const allHotels = yield this.hotelModel.find().sort({ createdAt: -1 }).lean().exec();
            return allHotels;
        });
    }
    updateHotel(hotelId, updatedDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof updatedDetails.images === 'string') {
                updatedDetails.images = JSON.parse(updatedDetails.images);
            }
            const updatedHotel = yield this.hotelModel
                .findByIdAndUpdate(hotelId, { $set: updatedDetails }, { new: true })
                .lean()
                .exec();
            return updatedHotel;
        });
    }
}
exports.HotelRepository = HotelRepository;
