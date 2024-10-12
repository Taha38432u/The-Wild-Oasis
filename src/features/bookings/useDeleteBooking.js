import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings.js";
import { useNavigate } from "react-router-dom";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success(`Booking successfully deleted`);
      queryClient.invalidateQueries({
        queryKey: [`bookings`],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteBooking };
}
