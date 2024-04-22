import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGroupApi } from "./studyGroupHelper";

export default function useAddGroup({ onSuccess, onError }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ groupName, groupTarget }) =>
      addGroupApi(groupName, groupTarget),
    onSuccess: (data) => {
      const { groupName, groupId, groupOwnerId, groupTarget } = data;
      queryClient.setQueryData(["groups"], (cache) => {
        cache.push({
          groupName,
          groupId,
          groupOwnerId,
          groupSize: 1,
          groupTarget,
        });
      });
      onSuccess({ groupName, groupId, groupOwnerId });
    },
    onError: onError,
  });
  return { mutate, isPending };
}
