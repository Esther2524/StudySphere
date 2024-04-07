import { View, FlatList, StyleSheet, RefreshControl, Text } from "react-native";
import React from "react";
import GroupCardItem from "./GroupCardItem";
import useGetAllGroupsByUser from "./useGetAllGroupsByUser";
import { useQueryClient } from "@tanstack/react-query";
import { Colors } from "../../../utils/Colors";
import LottieView from "lottie-react-native";

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
      {!isLoading && groupData.length >= 0 && (
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
            item: { groupName, groupSize, groupId, groupOwnerId, groupTarget },
          }) => (
            <GroupCardItem
              groupName={groupName}
              groupSize={groupSize}
              groupId={groupId}
              groupOwnerId={groupOwnerId}
              groupTarget={groupTarget}
            />
          )}
        />
      )}
      {!isLoading && groupData.length === 0 && (
        <View style={styles.placeholderContainer}>
          <LottieView
            style={{ width: "100%", height: "100%" }}
            source={require("../../../../assets/placeholder-StudyGroup.json")}
            autoPlay
            loop
          />
          <Text style={styles.placeholderText}>
            You haven't joined any group yet. Create your group or search a
            group to join.
          </Text>
        </View>
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
  placeholderContainer: {
    width: 250,
    height: 250,
    marginBottom: 350,
    borderRadius: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.shallowTextColor,
    marginTop: -20,
  },
});
