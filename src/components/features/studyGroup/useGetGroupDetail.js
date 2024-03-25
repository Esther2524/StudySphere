import { useQuery } from "@tanstack/react-query";
import { getGroupDetail } from "./studyGroupHelper";

export default function useGetGroupDetail(groupId) {
  const { data, isLoading, error } = useQuery({
    queryKey: [groupId, "group-detail"],
    queryFn: () => getGroupDetail(groupId),
    throwOnError: (err) => {
      console.log(err);
    },
  });
  return { data, isLoading, error };
}
