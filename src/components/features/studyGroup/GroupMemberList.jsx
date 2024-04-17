import { View, StyleSheet, FlatList, Text } from "react-native";
import React from "react";
import { Colors } from "../../../utils/Colors";
import GroupMemberItem from "./GroupMemberItem";
import useGetGroupDetail from "./useGetGroupDetail";
import GroupMemberItemSkeleton from "./GroupMemberItemSkeleton";
import useLikeGroupMember from "./useLikeGroupMember";

export default function GroupMemberList({ groupId }) {
  const {
    data: groupDetailData,
    isLoading: isLoadingGroupDetail,
    error,
  } = useGetGroupDetail(groupId);
  const { mutate: likeMember } = useLikeGroupMember();

  return (
    <View style={styles.container}>
      {isLoadingGroupDetail &&
        Array.from({ length: 3 }).map((_, ind) => (
          <GroupMemberItemSkeleton key={ind} />
        ))}
      {!isLoadingGroupDetail && (
        <FlatList
          data={groupDetailData.userData}
          renderItem={({
            item: { name, avatar, studyTime, likesCount, userId },
          }) => (
            <GroupMemberItem
              avatar={avatar}
              name={name}
              studyTime={studyTime}
              groupTarget={groupDetailData.groupTarget}
              likesCount={likesCount}
              likeHandler={() => likeMember({ groupId, userId })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBgColor,
    justifyContent: "center",
    width: 340,
    borderRadius: 15,
    marginTop: 30,
    paddingLeft: 20,
    paddingVertical: 20,
  },
});
