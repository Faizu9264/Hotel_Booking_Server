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
exports.DefaultBookingService = void 0;
// src/domain/services/DefaultBookingService.ts
const inversify_1 = require("inversify");
const BookingRepository_1 = require("../../infrastructure/database/repositories/BookingRepository");
let DefaultBookingService = class DefaultBookingService {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    createBooking(bookingDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.createBooking(bookingDetails);
        });
    }
    getAllBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.getAllBookings();
        });
    }
    getBookingsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.getBookingsByUserId(userId);
        });
    }
    getBookingById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.getBookingById(bookingId);
        });
    }
    updateBooking(booking) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.updateBooking(booking);
        });
    }
};
exports.DefaultBookingService = DefaultBookingService;
exports.DefaultBookingService = DefaultBookingService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("BookingRepository")),
    __metadata("design:paramtypes", [BookingRepository_1.BookingRepository])
], DefaultBookingService);
