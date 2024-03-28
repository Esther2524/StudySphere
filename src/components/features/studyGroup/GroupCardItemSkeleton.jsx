import { View, StyleSheet } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";

export default function GroupCardItemSkeleton() {
  return (
    <View style={styles.container}>
      <Skeleton width={220} height={25} style={styles.titleSkeleton} />
      <Skeleton circle width={30} height={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleSkeleton: {
    borderRadius: 5,
    marginRight: 30,
  },
});
