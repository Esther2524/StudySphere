import { View, StyleSheet } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";

export default function GroupResultsItemSkeleton() {
  return (
    <View style={styles.container}>
      <View>
        <Skeleton style={styles.skeleton} width={200} height={25} />
      </View>
      <View style={styles.lineTwo}>
        <Skeleton circle width={30} height={30} />
        <Skeleton
          style={[styles.skeleton, styles.btn]}
          width={60}
          height={25}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  skeleton: {
    borderRadius: 5,
  },
  lineTwo: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    borderRadius: 20,
    height: 35,
    width: 70,
  },
});
