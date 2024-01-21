"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
// src/usecase/inversify.config.ts
const inversify_1 = require("inversify");
const userUseCase_1 = require("./userUseCase");
const DefaultHotelService_1 = require("../domain/services/DefaultHotelService");
const HotelRepository_1 = require("../infrastructure/database/repositories/HotelRepository");
const DefaultRoomService_1 = require("../domain/services/DefaultRoomService");
const RoomRepository_1 = require("../infrastructure/database/repositories/RoomRepository");
const DefaultBookingService_1 = require("../domain/services/DefaultBookingService");
const BookingRepository_1 = require("../infrastructure/database/repositories/BookingRepository");
const DefaultCouponService_1 = require("../domain/services/DefaultCouponService");
const CouponRepository_1 = require("../infrastructure/database/repositories/CouponRepository");
const types_1 = require("./types");
const container = new inversify_1.Container();
exports.container = container;
container.bind(userUseCase_1.DefaultUserUseCase).toSelf();
container.bind(types_1.TYPES.HotelService).to(DefaultHotelService_1.DefaultHotelService);
container.bind("HotelRepository").to(HotelRepository_1.HotelRepository);
container.bind(types_1.TYPES.RoomService).to(DefaultRoomService_1.DefaultRoomService);
container.bind("RoomRepository").to(RoomRepository_1.RoomRepository);
container
    .bind(types_1.TYPES.BookingService)
    .to(DefaultBookingService_1.DefaultBookingService);
container.bind("BookingRepository").to(BookingRepository_1.BookingRepository);
container.bind("CouponRepository").to(CouponRepository_1.CouponRepository);
container
    .bind(types_1.TYPES.CoupenService)
    .to(DefaultCouponService_1.DefaultCouponService);
