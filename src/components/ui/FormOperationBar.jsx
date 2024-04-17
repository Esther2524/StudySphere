import { View, StyleSheet, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import { Colors } from "../../utils/Colors";
import Animated, {
  ReduceMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Progress from "react-native-progress";

export default function FormOperationBar({
  confirmText,
  cancelText,
  confirmHandler,
  cancelHandler,
  confirmDisabled,
  isSubmittingOuter,
  theme = "green",
  hasCancelBtn = true,
  extraContainerStyle,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const confirmBtnWidth = useSharedValue(100);

  let themedConfirmBtnContainer;
  let themedConfirmBtnText;
  let progressColor = Colors.shallowTextColor;
  if (theme === "shallow") {
    themedConfirmBtnContainer = { backgroundColor: Colors.cardBgColor };
    themedConfirmBtnText = { color: Colors.screenBgColor };
    progressColor = Colors.screenBgColor;
  }

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
    <View style={[styles.container, extraContainerStyle]}>
      {hasCancelBtn && (
        <PressableButton
          onPress={cancelHandler}
          containerStyle={styles.cancelBtnContainer}
        >
          <Text style={styles.cancelBtnText}>{cancelText}</Text>
        </PressableButton>
      )}
      <PressableButton
        onPress={onConfirm}
        disabled={isSubmittingForm}
        containerStyle={[extraConfirmBtnStyle]}
      >
        <Animated.View
          style={[
            styles.confirmBtnContainer,
            themedConfirmBtnContainer,
            { width: confirmBtnWidth },
          ]}
        >
          {isSubmittingForm ? (
            <>
              <Text
                numberOfLines={1}
                style={[styles.confirmBtnText, themedConfirmBtnText]}
              >
                Loading...
              </Text>
              <Progress.Circle
                style={{ marginLeft: 5 }}
                borderColor={progressColor}
                size={20}
                indeterminate={true}
                borderWidth={2}
              />
            </>
          ) : (
            <Text style={[styles.confirmBtnText, themedConfirmBtnText]}>
              {confirmText}
            </Text>
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
