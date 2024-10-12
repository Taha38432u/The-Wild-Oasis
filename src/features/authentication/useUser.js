import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth.js";

export default function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
