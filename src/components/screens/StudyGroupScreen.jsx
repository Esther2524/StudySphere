import { View, Text, StyleSheet, Modal } from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";
import GroupCardList from "../features/studyGroup/GroupCardList";

export default function StudyGroupScreen() {
  return (
    <View style={styles.container}>
      <GroupCardList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
  },
  innerContainer: {
    backgroundColor: Colors.groupBgColor,
  },
});
