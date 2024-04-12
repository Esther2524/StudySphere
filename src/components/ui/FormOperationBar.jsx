import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import { Colors } from "../../utils/Colors";
import Animated, {
  ReduceMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function FormOperationBar({
  confirmText,
  cancelText,
  confirmHandler,
  cancelHandler,
  confirmDisabled,
  isSubmittingOuter,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const confirmBtnWidth = useSharedValue(110);

  const onConfirm = useCallback(async () => {
    setIsSubmitting(true);
    await confirmHandler();
    setIsSubmitting(false);
  }, [confirmHandler]);

  const isSubmittingForm = isSubmitting || isSubmittingOuter;

  useEffect(() => {
    const springConfig = {
      mass: 1,
      damping: 15,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    };
    if (isSubmittingForm)
      confirmBtnWidth.value = withSpring(
        confirmBtnWidth.value + 45,
        springConfig
      );
    else confirmBtnWidth.value = withSpring(100, springConfig);
  }, [isSubmittingForm]);

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
        containerStyle={[extraConfirmBtnStyle]}
      >
        <Animated.View
          style={[styles.confirmBtnContainer, { width: confirmBtnWidth }]}
        >
          {isSubmittingForm ? (
            <>
              <Text numberOfLines={1} style={styles.confirmBtnText}>
                Loading...
              </Text>
              <ActivityIndicator
                style={{ marginLeft: 5 }}
                color={Colors.shallowTextColor}
              />
            </>
          ) : (
            <Text style={styles.confirmBtnText}>{confirmText}</Text>
          )}
        </Animated.View>
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
    minWidth: 100,
    flexWrap: "nowrap",
  },
  confirmBtnText: {
    fontSize: 16,
    color: Colors.confirmBtnText,
    overflow: "hidden",
  },
});
