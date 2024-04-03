import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import PressableButton from "../ui/PressableButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";
import {
  DASHBOARD_SCREEN_TITLE,
  FIND_SCREEN_TITLE,
  FOCUS_STACK_NAME,
  GROUP_STACK_NAME,
  PROFILE_SCREEN_TITLE,
} from "../../utils/constants";

const routeToActiveIcon = {
  [GROUP_STACK_NAME]: "people",
  [FIND_SCREEN_TITLE]: "search",
  [FOCUS_STACK_NAME]: "duplicate",
  [DASHBOARD_SCREEN_TITLE]: "bar-chart",
  [PROFILE_SCREEN_TITLE]: "person",
};

const routeToInactiveIcon = {
  [GROUP_STACK_NAME]: "people-outline",
  [FIND_SCREEN_TITLE]: "search-outline",
  [FOCUS_STACK_NAME]: "duplicate-outline",
  [DASHBOARD_SCREEN_TITLE]: "bar-chart-outline",
  [PROFILE_SCREEN_TITLE]: "person-outline",
};

export default function AppTabBar({ state, descriptors, navigation }) {
  return (
    <BlurView
      style={styles.container}
      tint="systemMaterialDark"
      experimentalBlurMethod="dimezisBlurView"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;

        const isFocused = state.index === index;

        const iconName = isFocused
          ? routeToActiveIcon[label]
          : routeToInactiveIcon[label];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <PressableButton
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
          >
            <Ionicons name={iconName} size={24} color={Colors.tabIconColor} />
          </PressableButton>
        );
      })}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 15,
    borderRadius: 100,
    justifyContent: "space-evenly",
  },
});
