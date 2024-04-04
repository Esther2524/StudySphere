import { useQuery } from "@tanstack/react-query";
import { getAllGroupsByUser } from "./studyGroupHelper";
import { Alert } from "react-native";

export default function useGetAllGroupsByUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroupsByUser,
    throwOnError: (err) => {
      Alert.alert(err.message);
    },
  });
  return { data, isLoading, error };
}
