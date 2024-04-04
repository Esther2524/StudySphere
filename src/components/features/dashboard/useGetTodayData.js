import { useQuery } from "@tanstack/react-query";
import { getDailyFocusInfo } from "./dashboardHelper";
import { Alert } from "react-native";

export default function useGetTodayData() {
  const { data, isLoading } = useQuery({
    queryKey: ["today-data"],
    queryFn: () => getDailyFocusInfo(new Date()),
    throwOnError: (err) => Alert.alert(err.message),
  });
  return { data, isLoading };
}
