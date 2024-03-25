import { View, StyleSheet, FlatList, Text } from "react-native";
import React from "react";
import { Colors } from "../../../utils/Colors";
import GroupMemberItem from "./GroupMemberItem";
import useGetGroupDetail from "./useGetGroupDetail";

export default function GroupMemberList({ groupId }) {
  const {
    data: groupDetailData,
    isLoading,
    error,
  } = useGetGroupDetail(groupId);

  if (isLoading) return <Text>Loading...</Text>;

  const tempData = [
    {
      name: "Harry",
      avatar: "https://i.pravatar.cc/48?u=118836",
      studyTime: 3,
    },
    { name: "Amy", avatar: "https://i.pravatar.cc/48?u=933372", studyTime: 5 },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={tempData}
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
