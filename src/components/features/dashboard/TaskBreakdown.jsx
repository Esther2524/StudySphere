import { View, StyleSheet } from "react-native";
import React from "react";
import StatsCardContainer from "./StatsCardContainer";
import { PieChart } from "react-native-gifted-charts";
import { parsePieData } from "./dashboardHelper";
import useGetTodayData from "./useGetTodayData";
import PieChartMarker from "./PieChartMarker";

export default function TaskBreakdown() {
  const { data, isLoading } = useGetTodayData();

  let pieData = [];
  if (!isLoading) pieData = parsePieData(data);

  return (
    <StatsCardContainer title="Task Breakdown">
      <View style={styles.pieContainer}>
        <PieChart
          data={pieData}
          donut
          focusOnPress
          radius={90}
          innerRadius={60}
        />
      </View>
      <View style={styles.markerContainer}>
        {pieData.map((item, ind) => (
          <PieChartMarker key={ind} color={item.color} title={item.title} />
        ))}
      </View>
    </StatsCardContainer>
  );
}

const styles = StyleSheet.create({
  pieContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  markerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
    paddingLeft: 5,
    width: 300,
  },
});
