import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinGroupById } from "./findGroupHelper";
import { Alert } from "react-native";
import {
  QUERY_KEY_GROUP_LIST,
  QUERY_KEY_SEARCH_GROUP,
} from "../../../utils/constants";

export default function useJoinGroup() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (groupId) => joinGroupById(groupId),
    onSuccess: (groupId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_GROUP_LIST] });
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEY_SEARCH_GROUP] },
        (old) =>
          old?.map((group) =>
            group.groupId === groupId
              ? {
                  ...group,
                  groupSize: group.groupSize + 1,
                  joined: true,
                }
              : group
          )
      );
    },
    onError: (e) => Alert.alert(e.message),
  });

  return { mutate, isPending };
}
