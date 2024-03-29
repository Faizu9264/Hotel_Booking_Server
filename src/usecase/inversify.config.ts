// src/usecase/inversify.config.ts
import { Container } from "inversify";
import { DefaultUserUseCase } from "./userUseCase";
import { DefaultHotelService } from "../domain/services/DefaultHotelService";
import { HotelRepository } from "../infrastructure/database/repositories/HotelRepository";
import { DefaultRoomService } from "../domain/services/DefaultRoomService";
import { RoomRepository } from "../infrastructure/database/repositories/RoomRepository";
import { DefaultBookingService } from "../domain/services/DefaultBookingService";
import { BookingRepository } from "../infrastructure/database/repositories/BookingRepository";
import { DefaultCouponService } from "../domain/services/DefaultCouponService";
import { CouponRepository } from "../infrastructure/database/repositories/CouponRepository";
import { TYPES } from "./types";

const container = new Container();

container.bind<DefaultUserUseCase>(DefaultUserUseCase).toSelf();
container.bind<DefaultHotelService>(TYPES.HotelService).to(DefaultHotelService);
container.bind<HotelRepository>("HotelRepository").to(HotelRepository);
container.bind<DefaultRoomService>(TYPES.RoomService).to(DefaultRoomService);
container.bind<RoomRepository>("RoomRepository").to(RoomRepository);
container
  .bind<DefaultBookingService>(TYPES.BookingService)
  .to(DefaultBookingService);
container.bind<BookingRepository>("BookingRepository").to(BookingRepository);
container.bind<CouponRepository>("CouponRepository").to(CouponRepository);
container
  .bind<DefaultCouponService>(TYPES.CoupenService)
  .to(DefaultCouponService);

export { container };
