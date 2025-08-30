import {
  placeBooking,
  modifyBooking,
  deleteBooking,
} from "../action/book.action";
import { getBooking } from "../queries/booking.queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const usePlaceBook = () => {
  return useMutation({
    mutationFn: placeBooking,
    onSuccess: (data) => {
      toast.success("Booking Successfully Placed");
      console.log("booking:", data);
    },
    onError: (error) => {
      toast.error("Failed");
      console.log("error", error);
    },
  });
};

export const useModifyBooking = () => {
  return useMutation({
    mutationFn: modifyBooking,
    onSuccess: (data) => {
      toast.success("Update Success");
      console.log("Update:", data);
    },
    onError: (error) => {
      toast.error("Update Failed");
      console.log("error", error);
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking Cancelled");
    },
    onError: (error) => {
      toast.error("Failed to cancel booking");
      console.log("error", error);
    },
  });
};

export const useGetBooking = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBooking,
  });
};
