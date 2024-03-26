import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinGroupById } from "./findGroupHelper";

export default function useJoinGroup(groupId) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (groupId) => joinGroupById(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return { mutate, isPending };
}
