import { View, Text, StyleSheet } from "react-native";
import React from "react";
import StatsCardContainer from "./StatsCardContainer";
import useGetTodayData from "./useGetTodayData";
import { getDailyOverview } from "./dashboardHelper";

export default function DailyOverview() {
  const { data, isLoading } = useGetTodayData();

  let dailyOverviewData = { numOfCompletions: 0, focusTime: 0, numOfBreaks: 0 };
  if (!isLoading) {
    dailyOverviewData = getDailyOverview(data);
  }

  const { focusTime, numOfBreaks, numOfCompletions } = dailyOverviewData;

  return (
    <StatsCardContainer title="Daily Overview">
      <View style={styles.infoContainer}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoTitle}>Achieved</Text>
          <Text style={styles.infoText}>{numOfCompletions}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoTitle}>Total Hours</Text>
          <Text style={styles.infoText}>{Number(focusTime.toFixed(1))}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoTitle}>Breaks</Text>
          <Text style={styles.infoText}>{numOfBreaks}</Text>
        </View>
      </View>
    </StatsCardContainer>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoColumn: {
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
  },
});
