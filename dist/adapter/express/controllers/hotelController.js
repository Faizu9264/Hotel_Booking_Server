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
exports.getAllHotelsController = exports.createHotelController = void 0;
const HotelUseCase_1 = require("../../../usecase/HotelUseCase");
const HotelRepository_1 = require("../../../infrastructure/database/repositories/HotelRepository");
const hotelModel_1 = __importDefault(require("../../../infrastructure/database/models/hotelModel"));
const hotelRepository = new HotelRepository_1.HotelRepository(hotelModel_1.default);
const hotelUseCase = new HotelUseCase_1.HotelUseCase(hotelRepository);
const createHotelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelDetails = req.body;
        const createdHotel = yield hotelUseCase.createHotel(hotelDetails);
        console.log(createdHotel);
        res.status(201).json(createdHotel);
    }
    catch (error) {
        console.error('Error creating hotel:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createHotelController = createHotelController;
const getAllHotelsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allHotels = yield hotelUseCase.getAllHotels();
        res.status(200).json(allHotels);
    }
    catch (error) {
        console.error('Error getting hotels:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllHotelsController = getAllHotelsController;
