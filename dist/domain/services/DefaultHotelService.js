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
exports.DefaultHotelService = void 0;
// src/domain/services/DefaultHotelService.ts
const inversify_1 = require("inversify");
const HotelRepository_1 = require("../../infrastructure/database/repositories/HotelRepository");
let DefaultHotelService = class DefaultHotelService {
    constructor(hotelRepository) {
        this.hotelRepository = hotelRepository;
    }
    createHotel(hotel) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hotelRepository.createHotel(hotel);
        });
    }
    getAllHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hotelRepository.getAllHotels();
        });
    }
    updateHotel(hotelId, updatedDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hotelRepository.updateHotel(hotelId, updatedDetails);
        });
    }
    addReview(hotelId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hotelRepository.addReview(hotelId, review);
        });
    }
    getAllReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hotelRepository.getAllReviews();
        });
    }
};
exports.DefaultHotelService = DefaultHotelService;
exports.DefaultHotelService = DefaultHotelService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("HotelRepository")),
    __metadata("design:paramtypes", [HotelRepository_1.HotelRepository])
], DefaultHotelService);
