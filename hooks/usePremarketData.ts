import { useQuery } from "@tanstack/react-query";
import { fetchPremarketData } from "@/lib/api";

export const usePremarketData = () => {
  return useQuery({
    queryKey: ["premarket-stocks"],
    queryFn: fetchPremarketData,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};
