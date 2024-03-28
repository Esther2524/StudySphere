import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import StatsCardContainer from "./StatsCardContainer";
import useGetTrend from "./useGetTrend";
import { LineChart } from "react-native-gifted-charts";

export default function FocusTrend() {
  const { data, isLoading } = useGetTrend();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <StatsCardContainer title="Focus Trend">
      <View style={styles.lineChartContainer}>
        <LineChart
          data={data}
          width={240}
          height={150}
          curved
          noOfSections={5}
          isAnimated
        />
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
});
