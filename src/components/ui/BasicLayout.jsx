import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";

export default function BasicLayout({ children }) {
  return <SafeAreaView styles={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
  },
});
