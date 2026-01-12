import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "",
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["role", user?.email],
    // Only run query if user is loaded and email exists
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/role/${user.email}`);
      return data.role;
    },
    // Prevent excessive retries for role fetching
    retry: 1,
  });

  return [role, isLoading, refetch];
};

export default useRole;
