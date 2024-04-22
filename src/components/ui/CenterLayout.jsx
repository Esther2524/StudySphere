import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";

export default function CenterLayout({ children }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
