import { useQuery } from "@tanstack/react-query";
import { getAllGroupsByUser } from "./studyGroupHelper";

export default function useGetAllGroupsByUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroupsByUser,
    throwOnError: (err) => {
      console.log(err);
    },
  });
  return { data, isLoading, error };
}
