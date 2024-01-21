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
exports.BookingRepository = void 0;
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
class BookingRepository {
    constructor() {
        this.bookingModel = bookingModel_1.default;
    }
    createBooking(bookingDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdBooking = yield this.bookingModel.create(bookingDetails);
            return createdBooking.toObject();
        });
    }
    getAllBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            const allBookings = yield this.bookingModel
                .find()
                .sort({ createdAt: -1 })
                .populate({
                path: "RoomId",
                model: "Room",
            })
                .lean()
                .exec();
            return allBookings;
        });
    }
    getBookingsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userBookings = yield this.bookingModel
                .find({ userId })
                .populate({
                path: "RoomId",
                model: "Room",
            })
                .lean()
                .exec();
            return userBookings;
        });
    }
    getBookingById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingModel.findById(bookingId).lean().exec();
        });
    }
    updateBooking(booking) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bookingModel.findByIdAndUpdate(booking._id, booking).exec();
        });
    }
}
exports.BookingRepository = BookingRepository;
