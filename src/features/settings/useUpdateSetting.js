import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings.js";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success(`Setting successfully edited`);
      queryClient.invalidateQueries({
        queryKey: [`settings`],
      });
    },
    onError: () => {
      toast.error(`Setting cannot be edited due to an error`);
    },
  });
  return { updateSetting, isUpdating };
}
