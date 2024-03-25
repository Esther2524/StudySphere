import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGroupApi } from "./studyGroupHelper";

export default function useAddGroup({ onSucces, onError }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (groupName) => addGroupApi(groupName),
    onSuccess: (data) => {
      const { groupName, groupId, groupOwnerId } = data;
      queryClient.setQueryData(["groups"], (cache) => {
        cache.push({ groupName, groupId, groupOwnerId, groupSize: 1 });
      });
      onSucces({ groupName, groupId });
    },
    onError: onError,
  });
  return { mutate, isPending };
}