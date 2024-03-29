import { useQuery } from "@tanstack/react-query";
import { getWeeklyFocusInfo } from "./dashboardHelper";

export default function useGetTrend() {
  const { data, isLoading } = useQuery({
    queryKey: ["trend-data"],
    queryFn: getWeeklyFocusInfo,
  });
  return { data, isLoading };
}
