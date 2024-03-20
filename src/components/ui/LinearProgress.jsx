import { View, StyleSheet } from "react-native";
import React from "react";

export default function LinearProgress({ value, width, height, color }) {
  const activeWidth = value * width;
  return (
    <View
      style={[
        styles.active,
        {
          height: height,
          backgroundColor: color,
          width: activeWidth,
          maxWidth: width,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: color,
            opacity: 0.5,
            width: width,
            height: height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 1000,
  },
  active: {
    borderRadius: 1000,
  },
});
