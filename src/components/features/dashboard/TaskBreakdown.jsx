import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import StatsCardContainer from "./StatsCardContainer";
import { PieChart } from "react-native-gifted-charts";
import { parsePieData } from "./dashboardHelper";
import useGetTodayData from "./useGetTodayData";
import PieChartMarker from "./PieChartMarker";
import { Skeleton } from "@rneui/base";
import { generateRandomInteger, limitStrLen } from "../../../utils/helper";

function PieCenter({ title, value, total, color }) {
  if (!title) return <></>;
  return (
    <View style={styles.centerContainer}>
      <Text style={[styles.centerValue, { color }]}>
        {Math.round((value / total) * 100)}%
      </Text>
      <Text style={[styles.centerTitle, { color }]}>
        {limitStrLen(title, 15)}
      </Text>
    </View>
  );
}

export default function TaskBreakdown() {
  const { data, isLoading } = useGetTodayData();
  const [focusedItem, setFocusedItem] = useState(null);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    if (!isLoading) setPieData(parsePieData(data));
  }, [isLoading]);

  let total = 0;
  if (data)
    total = data.reduce((pre, cur) => pre + cur.focusTime, 0).toFixed(1);

  const focusHandler = (obj, curInd) => {
    setFocusedItem({ total, ...obj });
    let focusedInd = 0;
    if (obj.id) focusedInd = pieData.findIndex((item) => item.id === obj.id);
    else focusedInd = -1;

    setPieData(
      pieData.map((item, ind) => ({
        ...item,
        focused: focusedInd === ind,
      }))
    );
  };

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
            radius={90}
            innerRadius={60}
            sectionAutoFocus
            onPress={focusHandler}
            centerLabelComponent={() => <PieCenter {...focusedItem} />}
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
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerTitle: {},
  centerValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
