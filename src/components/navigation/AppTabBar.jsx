import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import PressableButton from "../ui/PressableButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";

const routeToActiveIcon = {
  "Group Nav": "people",
  "Find Group": "search",
  "Focus List": "duplicate",
  Dashboard: "bar-chart",
  Profile: "person",
};

const routeToInactiveIcon = {
  "Group Nav": "people-outline",
  "Find Group": "search-outline",
  "Focus List": "duplicate-outline",
  Dashboard: "bar-chart-outline",
  Profile: "person-outline",
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
