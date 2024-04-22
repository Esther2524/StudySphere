import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../utils/Colors";
import DailyOverview from "../features/dashboard/DailyOverview";
import TaskBreakdown from "../features/dashboard/TaskBreakdown";
import FocusTrend from "../features/dashboard/FocusTrend";
import { useQueryClient } from "@tanstack/react-query";
import {
  QUERY_KEY_TODAY_DATA,
  QUERY_KEY_TREND_DATA,
} from "../../utils/constants";
import useGetTodayData from "../features/dashboard/useGetTodayData";
import useGetTrend from "../features/dashboard/useGetTrend";

export default function DashboardScreen() {
  const { isRefetching: isRefetchingTodayData } = useGetTodayData();
  const { isRefetching: isRefetchingTrend } = useGetTrend();
  const queryClient = useQueryClient();

  const onRefresh = () => {
    queryClient.invalidateQueries([QUERY_KEY_TREND_DATA]);
    queryClient.invalidateQueries([QUERY_KEY_TODAY_DATA]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingTodayData || isRefetchingTrend}
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
    paddingBottom: 100,
  },
});
