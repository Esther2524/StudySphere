import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup, quitGroup } from "./studyGroupHelper";
import { Alert } from "react-native";

export default function useQuitGroup(isOwner) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (groupId) =>
      isOwner ? deleteGroup(groupId) : quitGroup(groupId),
    onSuccess: (groupId) => {
      queryClient.setQueryData(["groups"], (old) =>
        old.filter((item) => item.groupId !== groupId)
      );
    },
    onError: (e) => {
      Alert.alert(e.message);
      queryClient.invalidateQueries(["groups"]);
    },
  });
  return { mutate, isPending };
}
