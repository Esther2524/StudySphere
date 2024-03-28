import { View, StyleSheet } from "react-native";
import React from "react";
import StatsCardContainer from "./StatsCardContainer";
import { PieChart } from "react-native-gifted-charts";
import { parsePieData } from "./dashboardHelper";
import useGetTodayData from "./useGetTodayData";
import PieChartMarker from "./PieChartMarker";
import { Skeleton } from "@rneui/base";
import { generateRandomInteger } from "../../../utils/helper";

export default function TaskBreakdown() {
  const { data, isLoading } = useGetTodayData();

  let pieData = [];
  if (!isLoading) pieData = parsePieData(data);

  return (
    <StatsCardContainer title="Task Breakdown">
      <View style={styles.pieContainer}>
        {isLoading && (
          <Skeleton
            width={180}
            height={180}
            circle
            style={styles.pieSkeleton}
          />
        )}
        {!isLoading && (
          <PieChart
            data={pieData}
            donut
            focusOnPress
            radius={90}
            innerRadius={60}
          />
        )}
      </View>
      <View style={styles.markerContainer}>
        {isLoading &&
          Array.from({ length: 5 }).map((_, ind) => (
            <Skeleton
              width={generateRandomInteger(60, 180)}
              height={20}
              key={ind}
            />
          ))}
        {!isLoading &&
          pieData.map((item, ind) => (
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
  pieSkeleton: {
    borderRadius: 90,
  },
});
