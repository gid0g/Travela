import client from "../config/axios.config";
import type { BookingFormData } from "../types/booking.types";

export const getBooking = async():Promise<BookingFormData[]>=>{
    try{
        const response = await client.get<BookingFormData[]>("/bookings/");
        return response?.data
    }
    catch(error){
        console.error("Error getting bookings", error)
        throw error;
    }
}