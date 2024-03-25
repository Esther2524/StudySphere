import { View, StyleSheet, Text } from "react-native";
import React, { useCallback, useState } from "react";
import PressableButton from "./PressableButton";
import { Colors } from "../../utils/Colors";
import { Spinner } from "@gluestack-ui/themed";

export default function FormOperationBar({
  confirmText,
  cancelText,
  confirmHandler,
  cancelHandler,
  confirmDisabled,
  isSubmittingOuter,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onConfirm = useCallback(async () => {
    setIsSubmitting(true);
    await confirmHandler();
    setIsSubmitting(false);
  }, [confirmHandler]);

  const isSubmittingForm = isSubmitting || isSubmittingOuter;

  const extraConfirmBtnStyle =
    confirmDisabled || isSubmittingForm ? styles.disabledBtn : null;

  return (
    <View style={styles.container}>
      <PressableButton
        onPress={cancelHandler}
        containerStyle={styles.cancelBtnContainer}
      >
        <Text style={styles.cancelBtnText}>{cancelText}</Text>
      </PressableButton>
      <PressableButton
        onPress={onConfirm}
        disabled={isSubmittingForm}
        containerStyle={[
          styles.confirmBtnContainer,
          { width: isSubmittingForm ? 135 : "auto" },
          extraConfirmBtnStyle,
        ]}
      >
        {isSubmittingForm ? (
          <>
            <Text style={styles.confirmBtnText}>Loading...</Text>
            <Spinner marginLeft={5} color={Colors.shallowTextColor} />
          </>
        ) : (
          <Text style={styles.confirmBtnText}>{confirmText}</Text>
        )}
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
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.cancelBtnBg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 1000,
    minWidth: 85,
  },
  cancelBtnText: {
    color: Colors.cancelBtnText,
    fontSize: 16,
  },
  confirmBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.confirmBtnBg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 1000,
    minWidth: 85,
  },
  confirmBtnText: {
    fontSize: 16,
    color: Colors.confirmBtnText,
  },
});
