import { useQuery } from "@tanstack/react-query";
import { searchGroup } from "./findGroupHelper";

export default function useSearchGroup(keyword) {
  const { data, isPending } = useQuery({
    queryKey: ["group-search-results", keyword],
    queryFn: async ({ signal }) => searchGroup(keyword, signal),
  });
  return { data, isPending };
}
