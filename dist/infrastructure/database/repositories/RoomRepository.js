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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRepository = void 0;
class RoomRepository {
    constructor(roomModel) {
        this.roomModel = roomModel;
    }
    createRoom(room) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdRoom = yield this.roomModel.create(room);
            return createdRoom.toObject();
        });
    }
    getRoomById(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this.roomModel.findById(roomId).lean().exec();
            return room;
        });
    }
    getAllRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            const allRooms = yield this.roomModel.find().sort({ createdAt: -1 }).lean().exec();
            return allRooms;
        });
    }
    updateRoom(roomId, updatedDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Updated Details Before Update:', updatedDetails);
                const updatedRoom = yield this.roomModel
                    .findByIdAndUpdate(roomId, { $set: updatedDetails }, { new: true })
                    .lean()
                    .exec();
                console.log('Updated Room:', updatedRoom);
                return updatedRoom;
            }
            catch (error) {
                console.error('Error updating room:', error);
                return null;
            }
        });
    }
    getRoomsByHotelId(hotelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.roomModel.find({ hotelId }).lean().exec();
            return rooms;
        });
    }
}
exports.RoomRepository = RoomRepository;
