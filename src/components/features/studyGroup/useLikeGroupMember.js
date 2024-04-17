import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeGroupMember } from "./studyGroupHelper";
import { QUERY_KEY_GROUP_DETAIL } from "../../../utils/constants";

export default function useLikeGroupMember() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: likeGroupMember,
    onMutate: ({ groupId, userId }) => {
      queryClient.setQueryData(
        [QUERY_KEY_GROUP_DETAIL, groupId],
        (prevData) => {
          return {
            ...prevData,
            userData: prevData.userData.map((member) => {
              if (member.userId === userId) {
                return {
                  ...member,
                  likesCount: (member.likesCount ? member.likesCount : 0) + 1,
                };
              }
              return member;
            }),
          };
        }
      );
    },
  });
  return { mutate, isPending };
}
