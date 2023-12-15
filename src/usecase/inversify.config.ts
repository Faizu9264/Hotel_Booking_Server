// src/usecase/inversify.config.ts
import { Container } from 'inversify';
import { DefaultUserUseCase } from './userUseCase';
import { DefaultHotelService } from '../domain/services/DefaultHotelService'; 
import { HotelRepository } from '../infrastructure/database/repositories/HotelRepository';
import { DefaultRoomService } from '../domain/services/DefaultRoomService';
import { RoomRepository } from '../infrastructure/database/repositories/RoomRepository';
import { TYPES } from './types';

const container = new Container();

container.bind<DefaultUserUseCase>(DefaultUserUseCase).toSelf();
container.bind<DefaultHotelService>(TYPES.HotelService).to(DefaultHotelService);
container.bind<HotelRepository>('HotelRepository').to(HotelRepository);
container.bind<DefaultRoomService>(TYPES.RoomService).to(DefaultRoomService);
container.bind<RoomRepository>('RoomRepository').to(RoomRepository);

export { container };
