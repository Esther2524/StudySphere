import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../utils/Colors";
import DailyOverview from "../features/dashboard/DailyOverview";
import TaskBreakdown from "../features/dashboard/TaskBreakdown";
import FocusTrend from "../features/dashboard/FocusTrend";
import { useQueryClient } from "@tanstack/react-query";

export default function DashboardScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onRefresh = () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries(["trend-data"]);
    queryClient.invalidateQueries(["today-data"]);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={Colors.headerTitleColor}
        />
      }
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
