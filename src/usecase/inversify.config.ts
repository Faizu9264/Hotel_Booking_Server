// src/usecase/inversify.config.ts
import { Container } from 'inversify';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';
import { DefaultUserUseCase } from './userUseCase';
import { DefaultHotelService } from '../domain/services/DefaultHotelService'; 
import { HotelRepository } from '../infrastructure/database/repositories/HotelRepository';
import { TYPES } from './types';

const container = new Container();

// Bind your use cases and services to the container
container.bind<RefreshTokenUseCase>(RefreshTokenUseCase).toSelf();
container.bind<DefaultUserUseCase>(DefaultUserUseCase).toSelf();
container.bind<DefaultHotelService>(TYPES.HotelService).to(DefaultHotelService);
container.bind<HotelRepository>('HotelRepository').to(HotelRepository);

export { container };
