import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";
import DailyOverview from "../features/dashboard/DailyOverview";
import TaskBreakdown from "../features/dashboard/TaskBreakdown";
import FocusTrend from "../features/dashboard/FocusTrend";

export default function DashboardScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <DailyOverview />
      <TaskBreakdown />
      <FocusTrend />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.screenBgColor },
  contentContainerStyle: {
    backgroundColor: Colors.screenBgColor,
    alignItems: "center",
    paddingVertical: 20,
    gap: 20,
  },
});
