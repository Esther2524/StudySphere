import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup, quitGroup } from "./studyGroupHelper";

export default function useQuitGroup(isOwner) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (groupId) =>
      isOwner ? deleteGroup(groupId) : quitGroup(groupId),
    onSettled: () => {
      queryClient.invalidateQueries(["groups"]);
    },
  });
  return { mutate, isPending };
}
