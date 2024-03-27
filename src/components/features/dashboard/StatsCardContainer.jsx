import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../../utils/Colors";

export default function StatsCardContainer({ children, title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 340,
    borderRadius: 20,
    backgroundColor: Colors.cardBgColor,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "bold",
  },
});
