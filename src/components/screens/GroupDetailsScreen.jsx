import { View, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";
import GroupDetailList from "../features/studyGroup/GroupDetailList";

export default function GroupDetailsScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <GroupDetailList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    height: "100%",
    alignItems: "center",
  },
});
