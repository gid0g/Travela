import client from "../config/axios.config";
import type { BookingFormData, BookingWithId } from "../types/booking.types";
export const placeBooking = async (data: BookingFormData) => {
  try {
    const response = await client.post("/bookings/", data);
    return response.data;
  } catch (error) {
    console.error("booking error", error);
    throw error;
  }
};

export const modifyBooking = async (data: BookingWithId) => {
  try {
    const response = await client.put(`/bookings/${data?.id}`, data);
    return response?.data;
  } catch (error) {
    console.error("update error", error);
    throw error;
  }
};

export const deleteBooking = async (data: BookingWithId) => {
  try {
    const response = await client.delete(`/bookings/${data?.id}`);
    return response?.data;
  } catch (error) {
    console.error("Cancel Aborted", error);
    throw error;
  }
};
