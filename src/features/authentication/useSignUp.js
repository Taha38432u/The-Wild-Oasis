import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export default function UseSignUp() {
  const { mutate: signUp, isPending: isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () =>
      toast.success(
        "Account successfully created. Please verify the account from the user's email address.",
      ),
  });

  return { isLoading, signUp };
}
