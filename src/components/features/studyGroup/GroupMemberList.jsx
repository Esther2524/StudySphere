import { View, StyleSheet, FlatList, Text } from "react-native";
import React from "react";
import { Colors } from "../../../utils/Colors";
import GroupMemberItem from "./GroupMemberItem";
import useGetGroupDetail from "./useGetGroupDetail";

export default function GroupMemberList({ groupId }) {
  const {
    data: groupDetailData,
    isLoading: isLoadingGroupDetail,
    error,
  } = useGetGroupDetail(groupId);

  if (isLoadingGroupDetail) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={groupDetailData}
        renderItem={({ item: { name, avatar, studyTime } }) => (
          <GroupMemberItem avatar={avatar} name={name} studyTime={studyTime} />
        )}
      />
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
