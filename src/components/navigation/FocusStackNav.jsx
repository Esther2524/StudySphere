import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StandbyScreen from "../screens/StandbyScreen";
import FocusScreen from "../screens/FocusScreen";
import { Colors } from "../../utils/Colors";
import { FOCUS_SCREEN_TITLE, STANDBY_SCREEN_NAME } from "../../utils/constants";

export default function FocusStackNav() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={FOCUS_SCREEN_TITLE}
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: Colors.headerTitleColor,
        },
        headerStyle: {
          backgroundColor: Colors.screenBgColor,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name={FOCUS_SCREEN_TITLE} component={FocusScreen} />
      <Stack.Screen
        name={STANDBY_SCREEN_NAME}
        component={StandbyScreen}
        options={{
          presentation: "modal", // covers the entire previous screen, including any bottom tabs or upper areas like the navigation bar,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
