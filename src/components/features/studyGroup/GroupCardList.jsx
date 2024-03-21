import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import GroupCardItem from "./GroupCardItem";

export default function groupCardList() {
  const tempData = [
    {
      title: "Study React Native Together!",
      numOfPeople: 12,
      groupId: "adwad",
    },
    { title: "Reading Group", numOfPeople: 6, groupId: "grddves" },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={tempData}
        renderItem={({ item: { title, numOfPeople, groupId } }) => (
          <GroupCardItem title={title} numOfPeople={numOfPeople} />
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
