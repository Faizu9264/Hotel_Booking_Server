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
exports.approveBookingController = exports.cancelBookingController = exports.getBookingsByUserController = exports.handleWebhookEvent = exports.getAllBookingsController = exports.createBookingController = void 0;
const BookingUseCase_1 = require("../../../usecase/BookingUseCase");
const BookingRepository_1 = require("../../../infrastructure/database/repositories/BookingRepository");
const node_cache_1 = __importDefault(require("node-cache"));
const mongoose_1 = require("mongoose");
const cache = new node_cache_1.default();
const bookingRepository = new BookingRepository_1.BookingRepository();
const bookingUseCase = new BookingUseCase_1.BookingUseCase(bookingRepository);
const createBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("createBookingController body", req.body);
        const bookingDetails = req.body.bookingDetails;
        const userId = req.body.userId;
        // Rearrange the data and remove roomDetails
        const rearrangedBookingDetails = {
            _id: new mongoose_1.Types.ObjectId(),
            guestName: bookingDetails.guestName,
            email: bookingDetails.email,
            phone: bookingDetails.phone,
            specialRequests: bookingDetails.specialRequests,
            checkInDate: bookingDetails.checkInDate,
            checkOutDate: bookingDetails.checkOutDate,
            adultCount: bookingDetails.adultCount,
            childrenCount: bookingDetails.childrenCount,
            roomCount: bookingDetails.roomCount,
            nightCount: bookingDetails.nightCount,
            maxPeople: bookingDetails.maxPeople,
            total: bookingDetails.total,
            discountPrice: bookingDetails.discountPrice,
            paymentStatus: "success",
            BookingStatus: "confirmed",
            paymentMethod: "stripe",
            RoomId: bookingDetails.roomDetails.id,
            HotelId: bookingDetails.roomDetails.hotelId,
            userId: userId,
        };
        const createdBooking = yield bookingUseCase.createBooking(rearrangedBookingDetails);
        res.status(201).json(createdBooking);
    }
    catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createBookingController = createBookingController;
const getAllBookingsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookings = yield bookingUseCase.getAllBookings();
        res.status(200).json(allBookings);
    }
    catch (error) {
        console.error("Error getting all bookings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllBookingsController = getAllBookingsController;
const handleWebhookEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = req.body;
        switch (event.type) {
            case "payment_intent.succeeded":
                console.log("Payment successful");
                const { bookingDetails, userId } = req.app.locals.CheckoutBody;
                yield (0, exports.createBookingController)({ body: { bookingDetails, userId } }, res);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
        res.send();
    }
    catch (error) {
        console.error("Error handling webhook event:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.handleWebhookEvent = handleWebhookEvent;
const getBookingsByUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userBookings = yield bookingUseCase.getBookingsByUserId(userId);
        res.status(200).json(userBookings);
    }
    catch (error) {
        console.error("Error getting user bookings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getBookingsByUserController = getBookingsByUserController;
const cancelBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // const bookingId = req.params.bookingId.trim();
        const { user, params } = req;
        const { bookingId } = params;
        // Fetch the booking from the database
        const booking = yield bookingUseCase.getBookingById(bookingId);
        if (!booking) {
            res.status(404).json({ error: "Booking not found" });
            return;
        }
        // Check if the API call is from an admin
        if ((user === null || user === void 0 ? void 0 : user.role) === "admin") {
            // Update the booking status to canceled by admin
            booking.BookingStatus = "canceled by admin";
            // Save the updated booking
            yield bookingUseCase.updateBooking(booking);
            res.status(200).json({ message: "canceled by admin" });
            return;
        }
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId) === booking.userId) {
            // Update the booking status to canceled by user
            booking.BookingStatus = "canceled by user";
            // Save the updated booking
            yield bookingUseCase.updateBooking(booking);
            res.status(200).json({ message: "canceled by user" });
            return;
        }
        else {
            res.status(403).json({ error: "Permission denied" });
        }
    }
    catch (error) {
        console.error("Error canceling booking by admin:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.cancelBookingController = cancelBookingController;
const approveBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, params } = req;
        const { bookingId } = params;
        if (user) {
            if (user.role !== "admin") {
                res
                    .status(403)
                    .json({ error: "Forbidden - Only admins can approve bookings" });
                return;
            }
        }
        // Fetch the booking by ID
        const booking = yield bookingUseCase.getBookingById(bookingId);
        if (!booking) {
            res.status(404).json({ error: "Booking not found" });
            return;
        }
        booking.BookingStatus = "approved by admin";
        const updatedBooking = yield bookingUseCase.updateBooking(booking);
        res.status(200).json(updatedBooking);
    }
    catch (error) {
        console.error("Error approving booking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.approveBookingController = approveBookingController;
