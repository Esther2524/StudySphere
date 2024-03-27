import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { limitStrLen } from "../../../utils/helper";

export default function PieChartMarker({ color, title }) {
  return (
    <View style={styles.container}>
      <View style={[styles.marker, { backgroundColor: color }]} />
      <Text style={styles.title}>{limitStrLen(title, 20)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  marker: {
    height: 12,
    width: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
});
