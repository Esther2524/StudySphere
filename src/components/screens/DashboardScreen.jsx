import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";
import DailyOverview from "../features/dashboard/DailyOverview";
import TaskBreakdown from "../features/dashboard/TaskBreakdown";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <DailyOverview />
      <TaskBreakdown />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    gap: 20,
  },
});
