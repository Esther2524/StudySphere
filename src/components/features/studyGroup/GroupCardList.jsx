import { View, FlatList, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import GroupCardItem from "./GroupCardItem";
import useGetAllGroupsByUser from "./useGetAllGroupsByUser";

export default function groupCardList() {
  const { data: groupData, isLoading, error } = useGetAllGroupsByUser();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={groupData}
        renderItem={({
          item: { groupName, groupSize, groupId, groupOwnerId },
        }) => (
          <GroupCardItem
            groupName={groupName}
            groupSize={groupSize}
            groupId={groupId}
            groupOwnerId={groupOwnerId}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
});
