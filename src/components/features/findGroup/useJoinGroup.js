import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinGroupById } from "./findGroupHelper";
import { Alert } from "react-native";

export default function useJoinGroup() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (groupId) => joinGroupById(groupId),
    onSuccess: (groupId) => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.setQueriesData(
        { queryKey: ["group-search-results"] },
        (old) =>
          old.map((group) =>
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
