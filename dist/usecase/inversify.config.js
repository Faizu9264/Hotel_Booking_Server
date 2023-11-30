"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
// src/usecase/inversify.config.ts
const inversify_1 = require("inversify");
const RefreshTokenUseCase_1 = require("./RefreshTokenUseCase");
const userUseCase_1 = require("./userUseCase");
const DefaultHotelService_1 = require("../domain/services/DefaultHotelService");
const HotelRepository_1 = require("../infrastructure/database/repositories/HotelRepository");
const types_1 = require("./types");
const container = new inversify_1.Container();
exports.container = container;
// Bind your use cases and services to the container
container.bind(RefreshTokenUseCase_1.RefreshTokenUseCase).toSelf();
container.bind(userUseCase_1.DefaultUserUseCase).toSelf();
container.bind(types_1.TYPES.HotelService).to(DefaultHotelService_1.DefaultHotelService);
container.bind('HotelRepository').to(HotelRepository_1.HotelRepository);
