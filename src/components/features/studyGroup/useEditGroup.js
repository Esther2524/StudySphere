import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroup } from "./studyGroupHelper";

export default function useEditGroup({ onSuccess, onError }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ groupId, groupName, groupTarget }) =>
      updateGroup({ groupId, groupName, groupTarget }),
    onSuccess: (data) => {
      onSuccess(data.groupName);
      queryClient.invalidateQueries([data.groupId, "group-detail"]);
      queryClient.setQueriesData({ queryKey: ["groups"] }, (old) =>
        old.map((item) =>
          item.groupId !== data.groupId
            ? item
            : {
                ...item,
                groupName: data.groupName,
                groupTarget: data.groupTarget,
              }
        )
      );
    },
    onError: onError,
  });
  return { mutate, isPending };
}
