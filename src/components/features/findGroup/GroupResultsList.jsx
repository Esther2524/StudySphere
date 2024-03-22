import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GroupResultsItem from "./GroupResultsItem";
import { Colors } from "../../../utils/Colors";

const tempData = [
  { groupName: "Study React Native Together!", numOfPeople: 30, groupId: 1 },
  { groupName: "We love reading :)", numOfPeople: 12, groupId: 2 },
];

export default function GroupResultsList({ keyword }) {
  const results = tempData.filter((item) =>
    item.groupName.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {results.length > 0 && <Text style={styles.listTitle}>Results</Text>}
      {keyword &&
        results.map((item) => (
          <GroupResultsItem {...item} key={item.groupId} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  listTitle: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 15,
    color: Colors.shallowTextColor,
  },
});
