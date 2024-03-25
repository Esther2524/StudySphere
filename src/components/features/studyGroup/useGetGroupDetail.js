import { useQuery } from "@tanstack/react-query";
import { getGroupDetail } from "./studyGroupHelper";

export default function useGetGroupDetail(groupId) {
  const { data, isLoading } = useQuery({
    queryKey: [groupId, "group-detail"],
    queryFn: () => getGroupDetail(groupId),
  });
  return { data, isLoading };
}
