import { View, StyleSheet } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";

export default function GroupCardItemSkeleton() {
  return (
    <View style={styles.container}>
      <Skeleton width={220} height={25} style={styles.titleSkeleton} />
      <View style={styles.subLine}>
        {Array.from({ length: 2 }).map((_, ind) => (
          <Skeleton
            width={40}
            height={20}
            style={styles.infoSkeleton}
            key={ind}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  titleSkeleton: {
    borderRadius: 20,
    marginRight: 30,
  },
  infoSkeleton: {
    borderRadius: 20,
  },
  subLine: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
});
