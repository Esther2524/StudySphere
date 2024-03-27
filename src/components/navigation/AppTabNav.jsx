import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import FindGroupScreen from "../screens/FindGroupScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GroupStackNav from "./GroupStackNav";
import { Colors } from "../../utils/Colors";
import FocusStackNav from "./FocusStackNav";

const Tab = createBottomTabNavigator();

export default function AppTabNav() {
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="Group Nav"
        component={GroupStackNav}
        options={{
          title: "Study Group",
          headerShown: false,
        }}
      />
      <Tab.Screen name="Find Group" component={FindGroupScreen} />
      <Tab.Screen
        name="Focus List"
        component={FocusStackNav}
        options={{
          title: "Focus Tasks",
          headerShown: false,
        }}
      />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
