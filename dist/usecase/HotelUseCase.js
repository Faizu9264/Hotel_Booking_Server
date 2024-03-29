"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.HotelUseCase = void 0;
// src/usecase/HotelUseCase.ts
const inversify_1 = require("inversify");
let HotelUseCase = class HotelUseCase {
    constructor(hotelService) {
        this.hotelService = hotelService;
    }
    createHotel(hotel) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hotelService.createHotel(hotel);
        });
    }
    getAllHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hotelService.getAllHotels();
        });
    }
    updateHotel(hotelId, updatedDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedHotel = yield this.hotelService.updateHotel(hotelId, updatedDetails);
            console.log("updatedHotel", updatedHotel);
            return updatedHotel;
        });
    }
    addReview(hotelId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hotelService.addReview(hotelId, review);
        });
    }
    getAllReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewsWithHotelId = yield this.hotelService.getAllReviews();
            const allReviews = reviewsWithHotelId.flatMap((item) => {
                const hotelId = item.hotelId;
                return (item.reviews || []).map((review) => (Object.assign(Object.assign({}, review), { hotelId })));
            });
            return allReviews;
        });
    }
};
exports.HotelUseCase = HotelUseCase;
exports.HotelUseCase = HotelUseCase = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("HotelService")),
    __metadata("design:paramtypes", [Object])
], HotelUseCase);
