import { View, Text, StyleSheet } from "react-native";
import React from "react";
import StatsCardContainer from "./StatsCardContainer";
import useGetTodayData from "./useGetTodayData";
import { getDailyOverview } from "./dashboardHelper";
import { Skeleton } from "@rneui/themed";

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
          {!isLoading && (
            <Text style={styles.infoText}>{numOfCompletions}</Text>
          )}
          {isLoading && (
            <Skeleton width={25} height={15} style={styles.infoSkeleton} />
          )}
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoTitle}>Total Hours</Text>
          {!isLoading && (
            <Text style={styles.infoText}>{Number(focusTime.toFixed(2))}</Text>
          )}
          {isLoading && (
            <Skeleton width={25} height={15} style={styles.infoSkeleton} />
          )}
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoTitle}>Breaks</Text>
          {!isLoading && <Text style={styles.infoText}>{numOfBreaks}</Text>}
          {isLoading && (
            <Skeleton width={25} height={15} style={styles.infoSkeleton} />
          )}
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
  infoSkeleton: {
    marginTop: 2,
  },
});
