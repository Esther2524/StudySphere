import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import StatsCardContainer from "./StatsCardContainer";
import useGetTrend from "./useGetTrend";
import { LineChart } from "react-native-gifted-charts";
import { Skeleton } from "@rneui/themed";

export default function FocusTrend() {
  const { data, isLoading } = useGetTrend();

  return (
    <StatsCardContainer title="Focus Trend">
      <View style={styles.lineChartContainer}>
        {isLoading && (
          <Skeleton width={260} height={180} style={styles.skeleton} />
        )}
        {!isLoading && (
          <LineChart
            data={data}
            width={240}
            height={150}
            curved
            noOfSections={5}
            isAnimated
          />
        )}
      </View>
    </StatsCardContainer>
  );
}

const styles = StyleSheet.create({
  lineChartContainer: {
    marginLeft: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  skeleton: {
    borderRadius: 20,
    marginBottom: 10,
  },
});
