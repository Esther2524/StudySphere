import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import React from "react";
import GroupCardItem from "./GroupCardItem";
import useGetAllGroupsByUser from "./useGetAllGroupsByUser";
import { useQueryClient } from "@tanstack/react-query";
import { Colors } from "../../../utils/Colors";

export default function groupCardList() {
  const queryClient = useQueryClient();
  const { data: groupData, isLoading, error } = useGetAllGroupsByUser();

  const onRefresh = () => {
    queryClient.invalidateQueries(["groups"]);
  };

  return (
    <View style={styles.container}>
      {isLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <GroupCardItem key={index} isLoading={true} />
        ))}
      {!isLoading && (
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={groupData}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              tintColor={Colors.headerTitleColor}
            />
          }
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
      )}
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
