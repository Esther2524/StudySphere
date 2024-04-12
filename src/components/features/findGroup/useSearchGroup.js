import { useQuery } from "@tanstack/react-query";
import { searchGroup } from "./findGroupHelper";
import { QUERY_KEY_SEARCH_GROUP } from "../../../utils/constants";

export default function useSearchGroup(keyword) {
  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEY_SEARCH_GROUP, keyword],
    queryFn: async ({ signal }) => searchGroup(keyword, signal),
  });
  return { data, isPending };
}
