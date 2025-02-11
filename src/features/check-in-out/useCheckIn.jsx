import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

function UseCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => `There was an error while checking in`,
  });
  return { checkIn, isCheckingIn };
}

export default UseCheckIn;
