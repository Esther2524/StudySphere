import { useQuery } from "@tanstack/react-query";
import { getDailyFocusInfo } from "./dashboardHelper";

export default function useGetTodayData() {
  const { data, isLoading } = useQuery({
    queryKey: ["today-data"],
    queryFn: () => getDailyFocusInfo(new Date()),
    throwOnError: (err) => console.log(err.message),
  });
  return { data, isLoading };
}
