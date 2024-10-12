import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

function UseCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been successfully checked out`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => `There was an error while checking out`,
  });
  return { checkOut, isCheckingOut };
}

export default UseCheckOut;
