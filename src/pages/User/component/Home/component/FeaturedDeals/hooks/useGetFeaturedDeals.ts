import { useQuery } from "@tanstack/react-query";
import { getFeaturedDeals } from "../api";

const useGetFeaturedDeals = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featuredDeals"],
    queryFn: getFeaturedDeals,
  });
  return { data, isLoading, isError };
};

export default useGetFeaturedDeals;
