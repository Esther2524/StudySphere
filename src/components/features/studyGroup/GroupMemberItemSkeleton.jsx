import { View, StyleSheet } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";
import { generateRandomInteger } from "../../../utils/helper";

export default function GroupMemberItemSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.lineOne}>
        <Skeleton circle width={36} />
        <Skeleton width={generateRandomInteger(40, 100)} style={styles.name} />
      </View>
      <Skeleton width={250} height={15} style={styles.progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: "auto",
  },
  lineOne: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 5,
  },
  name: {
    borderRadius: 10,
    height: 18,
  },
  progress: {
    borderRadius: 100,
    marginTop: 3,
  },
});
