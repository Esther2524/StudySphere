import { useQuery } from "@tanstack/react-query";
import { getGroupDetail } from "./studyGroupHelper";
import { QUERY_KEY_GROUP_DETAIL } from "../../../utils/constants";

export default function useGetGroupDetail(groupId) {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_GROUP_DETAIL, groupId],
    queryFn: () => getGroupDetail(groupId),
  });
  return { data, isLoading };
}
