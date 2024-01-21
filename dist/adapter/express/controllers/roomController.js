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
exports.getRoomsByHotelIdController = exports.updateRoomController = exports.getAllRoomsController = exports.getRoomByIdController = exports.createRoomController = void 0;
const RoomUseCase_1 = require("../../../usecase/RoomUseCase");
const RoomRepository_1 = require("../../../infrastructure/database/repositories/RoomRepository");
const roomModel_1 = __importDefault(require("../../../infrastructure/database/models/roomModel"));
const roomRepository = new RoomRepository_1.RoomRepository(roomModel_1.default);
const roomUseCase = new RoomUseCase_1.RoomUseCase(roomRepository);
const createRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomDetails = req.body.roomDetails;
        const createdRoom = yield roomUseCase.createRoom(roomDetails);
        res.status(201).json(createdRoom);
    }
    catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createRoomController = createRoomController;
const getRoomByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId } = req.params;
        const room = yield roomUseCase.getRoomById(roomId);
        if (room) {
            res.status(200).json(room);
        }
        else {
            res.status(404).json({ error: "Room not found" });
        }
    }
    catch (error) {
        console.error("Error getting room by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getRoomByIdController = getRoomByIdController;
const getAllRoomsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRooms = yield roomUseCase.getAllRooms();
        res.status(200).json(allRooms);
    }
    catch (error) {
        console.error("Error getting all rooms:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllRoomsController = getAllRoomsController;
const updateRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId } = req.params;
        const { roomDetails, images } = req.body;
        const updatedRoom = yield roomUseCase.updateRoom(roomId, {
            roomType: roomDetails.roomType,
            hotelName: roomDetails.hotelName,
            amenities: roomDetails.amenities,
            rentAmount: roomDetails.rentAmount,
            discountPrice: roomDetails.discountPrice,
            roomsCount: roomDetails.roomsCount,
            maxPeople: roomDetails.maxPeople,
            description: roomDetails.description,
            images: images ? images.flat() : [],
        });
        if (updatedRoom) {
            res.status(200).json(updatedRoom);
        }
        else {
            res.status(404).json({ error: "Room not found" });
        }
    }
    catch (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateRoomController = updateRoomController;
const getRoomsByHotelIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hotelId } = req.params;
        const rooms = yield roomUseCase.getRoomsByHotelId(hotelId);
        if (rooms.length > 0) {
            res.status(200).json(rooms);
        }
        else {
            res.status(404).json({ error: "No rooms found for the given hotelId" });
        }
    }
    catch (error) {
        console.error("Error getting rooms by hotelId:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getRoomsByHotelIdController = getRoomsByHotelIdController;
