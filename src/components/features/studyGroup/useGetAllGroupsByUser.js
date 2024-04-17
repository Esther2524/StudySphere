import { useQuery } from "@tanstack/react-query";
import { getAllGroupsByUser } from "./studyGroupHelper";
import { Alert } from "react-native";
import { QUERY_KEY_GROUP_LIST } from "../../../utils/constants";

export default function useGetAllGroupsByUser() {
  const { data, isLoading, isRefetching, error } = useQuery({
    queryKey: [QUERY_KEY_GROUP_LIST],
    queryFn: getAllGroupsByUser,
    throwOnError: (err) => {
      Alert.alert(err.message);
    },
  });
  return { data, isLoading, error, isRefetching };
}
