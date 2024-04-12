import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroup } from "./studyGroupHelper";
import {
  QUERY_KEY_GROUP_DETAIL,
  QUERY_KEY_GROUP_LIST,
} from "../../../utils/constants";

export default function useEditGroup({ onSuccess, onError }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ groupId, groupName, groupTarget }) =>
      updateGroup({ groupId, groupName, groupTarget }),
    onSuccess: (data) => {
      onSuccess(data.groupName);
      queryClient.invalidateQueries([data.groupId, QUERY_KEY_GROUP_DETAIL]);
      queryClient.setQueriesData({ queryKey: [QUERY_KEY_GROUP_LIST] }, (old) =>
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
