import { useQuery } from "@tanstack/react-query";
import { getWeeklyFocusInfo } from "./dashboardHelper";
import { QUERY_KEY_TREND_DATA } from "../../../utils/constants";

export default function useGetTrend() {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: [QUERY_KEY_TREND_DATA],
    queryFn: getWeeklyFocusInfo,
  });
  return { data, isLoading, isRefetching };
}
