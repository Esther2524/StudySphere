import { View, StyleSheet, Text } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import { Colors } from "../../utils/Colors";

export default function FormOperationBar({
  confirmText,
  cancelText,
  confirmHandler,
  cancelHandler,
  confirmDisabled,
}) {
  let extraConfirmBtnStyle;
  if (confirmDisabled) extraConfirmBtnStyle = styles.disabledBtn;

  return (
    <View style={styles.container}>
      <PressableButton
        onPress={cancelHandler}
        containerStyle={styles.cancelBtnContainer}
      >
        <Text style={styles.cancelBtnText}>{cancelText}</Text>
      </PressableButton>
      <PressableButton
        onPress={confirmHandler}
        containerStyle={[styles.confirmBtnContainer, extraConfirmBtnStyle]}
      >
        <Text style={styles.confirmBtnText}>{confirmText}</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: "auto",
    width: "100%",
  },
  disabledBtn: {
    opacity: 0.7,
  },
  cancelBtnContainer: {
    backgroundColor: Colors.cancelBtnBg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 1000,
  },
  cancelBtnText: {
    color: Colors.cancelBtnText,
    fontSize: 16,
  },
  confirmBtnContainer: {
    backgroundColor: Colors.confirmBtnBg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 1000,
  },
  confirmBtnText: {
    fontSize: 16,
    color: Colors.confirmBtnText,
  },
});
