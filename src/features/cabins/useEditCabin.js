import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success(`Cabin successfully edited`);
      queryClient.invalidateQueries({
        queryKey: [`cabins`],
      });
    },
    onError: () => {
      toast.error(`Cabin cannot be edited due to an error`);
    },
  });
  return { editCabin, isEditing };
}
