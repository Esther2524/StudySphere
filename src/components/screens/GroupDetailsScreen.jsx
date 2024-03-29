import { View, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";
import GroupMemberList from "../features/studyGroup/GroupMemberList";

export default function GroupDetailsScreen({ route, navigation }) {
  const groupId = route.params.groupId;

  return (
    <View style={styles.container}>
      <GroupMemberList groupId={groupId} />
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
