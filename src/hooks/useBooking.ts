import {
  placeBooking,
  modifyBooking,
  deleteBooking,
} from "../action/book.action";
import { getBooking } from "../queries/booking.queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const usePlaceBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeBooking,
    onSuccess: () => {
      toast.success("Booking Successfully Placed");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      toast.error("Failed");
    },
  });
};

export const useModifyBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: modifyBooking,
    onSuccess: () => {
      toast.success("Update Success");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      toast.error("Update Failed");
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
    onError: () => {
      toast.error("Failed to cancel booking");
    },
  });
};

export const useGetBooking = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBooking,
  });
};
