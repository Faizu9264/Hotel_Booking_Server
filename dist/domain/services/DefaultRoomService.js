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
exports.DefaultRoomService = void 0;
// src/domain/services/DefaultRoomService.ts
const inversify_1 = require("inversify");
const RoomRepository_1 = require("../../infrastructure/database/repositories/RoomRepository");
let DefaultRoomService = class DefaultRoomService {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    createRoom(room) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roomRepository.createRoom(room);
        });
    }
    getRoomById(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roomRepository.getRoomById(roomId);
        });
    }
    getAllRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roomRepository.getAllRooms();
        });
    }
    updateRoom(roomId, updatedDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roomRepository.updateRoom(roomId, updatedDetails);
        });
    }
    getRoomsByHotelId(hotelId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roomRepository.getRoomsByHotelId(hotelId);
        });
    }
};
exports.DefaultRoomService = DefaultRoomService;
exports.DefaultRoomService = DefaultRoomService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('RoomRepository')),
    __metadata("design:paramtypes", [RoomRepository_1.RoomRepository])
], DefaultRoomService);
