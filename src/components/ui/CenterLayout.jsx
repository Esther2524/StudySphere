import { StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CenterLayout({ children }) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
