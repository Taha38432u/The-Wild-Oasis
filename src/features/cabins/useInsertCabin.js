import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export default function useInsertCabin() {
  const queryClient = useQueryClient();
  const { mutate: insertCabin, isPending: isInserting } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success(`Cabin inserted successfully`);
      queryClient.invalidateQueries({
        queryKey: [`cabins`],
      });
    },
    onError: () => {
      toast.error(`Cabin cannot be inserted due to an error`);
    },
  });

  return { insertCabin, isInserting };
}
