// src/adapter/express/controllers/bookingController.ts
import { Request, Response } from "express";
import { BookingUseCase } from "../../../usecase/BookingUseCase";
import { BookingRepository } from "../../../infrastructure/database/repositories/BookingRepository";
import { Booking } from "../../../domain/entities/Booking";
import NodeCache from "node-cache";
import { ExtendedRequest } from "../middleware/tokenValidationMiddleware";
import { Types } from "mongoose";

const cache = new NodeCache();

const bookingRepository = new BookingRepository();
const bookingUseCase = new BookingUseCase(bookingRepository);
interface CustomRequest extends Request {
  rawBody?: string;
}

export const createBookingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("createBookingController body", req.body);

    const bookingDetails = req.body.bookingDetails;
    const userId = req.body.userId;

    // Rearrange the data and remove roomDetails
    const rearrangedBookingDetails: Partial<Document & Booking> = {
      _id: new Types.ObjectId(),
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

    const createdBooking = await bookingUseCase.createBooking(
      rearrangedBookingDetails as Booking
    );
    res.status(201).json(createdBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllBookingsController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const allBookings = await bookingUseCase.getAllBookings();

    res.status(200).json(allBookings);
  } catch (error) {
    console.error("Error getting all bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleWebhookEvent = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const event = req.body;

    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("Payment successful");
        const { bookingDetails, userId } = req.app.locals.CheckoutBody;
        await createBookingController(
          { body: { bookingDetails, userId } } as Request,
          res
        );
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    res.send();
  } catch (error: any) {
    console.error("Error handling webhook event:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBookingsByUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const userBookings = await bookingUseCase.getBookingsByUserId(userId);
    res.status(200).json(userBookings);
  } catch (error) {
    console.error("Error getting user bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelBookingController = async (
  req: ExtendedRequest,
  res: Response
): Promise<void> => {
  try {
    // const bookingId = req.params.bookingId.trim();
    const { user, params } = req;
    const { bookingId } = params;

    // Fetch the booking from the database
    const booking = await bookingUseCase.getBookingById(bookingId);

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    // Check if the API call is from an admin
    if (user?.role === "admin") {
      // Update the booking status to canceled by admin
      booking.BookingStatus = "canceled by admin";

      // Save the updated booking
      await bookingUseCase.updateBooking(booking);

      res.status(200).json({ message: "canceled by admin" });
      return;
    }
    if (req.user?.userId === booking.userId) {
      // Update the booking status to canceled by user
      booking.BookingStatus = "canceled by user";

      // Save the updated booking
      await bookingUseCase.updateBooking(booking);

      res.status(200).json({ message: "canceled by user" });
      return;
    } else {
      res.status(403).json({ error: "Permission denied" });
    }
  } catch (error) {
    console.error("Error canceling booking by admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const approveBookingController = async (
  req: ExtendedRequest,
  res: Response
): Promise<void> => {
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
    const booking = await bookingUseCase.getBookingById(bookingId);

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    booking.BookingStatus = "approved by admin";

    const updatedBooking = await bookingUseCase.updateBooking(booking);

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error approving booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
