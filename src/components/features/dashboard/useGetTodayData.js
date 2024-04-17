import { useQuery } from "@tanstack/react-query";
import { getDailyFocusInfo } from "./dashboardHelper";
import { Alert } from "react-native";
import { QUERY_KEY_TODAY_DATA } from "../../../utils/constants";

export default function useGetTodayData() {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: [QUERY_KEY_TODAY_DATA],
    queryFn: () => getDailyFocusInfo(new Date()),
    throwOnError: (err) => Alert.alert(err.message),
  });
  return { data, isLoading, isRefetching };
}
