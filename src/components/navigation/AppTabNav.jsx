import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import FindGroupScreen from "../screens/FindGroupScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GroupStackNav from "./GroupStackNav";
import { Colors } from "../../utils/Colors";
import FocusStackNav from "./FocusStackNav";
import AppTabBar from "./AppTabBar";
import {
  DASHBOARD_SCREEN_TITLE,
  FIND_SCREEN_TITLE,
  FOCUS_SCREEN_TITLE,
  FOCUS_STACK_NAME,
  GROUP_SCREEN_TITLE,
  GROUP_STACK_NAME,
  PROFILE_SCREEN_TITLE,
} from "../../utils/constants";

const Tab = createBottomTabNavigator();

export default function AppTabNav() {
  return (
    <Tab.Navigator
      initialRouteName={FOCUS_SCREEN_TITLE} // Set the initial screen
      tabBar={AppTabBar}
      sceneContainerStyle={{
        position: "relative",
      }}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.tabFocusColor,
        tabBarInactiveTintColor: Colors.tabFilledColor,

        headerTitleAlign: "center",
        headerTitleStyle: {
          color: Colors.headerTitleColor,
        },
        headerStyle: {
          backgroundColor: Colors.screenBgColor,
        },
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen
        name={GROUP_STACK_NAME}
        component={GroupStackNav}
        options={{
          title: { GROUP_SCREEN_TITLE },
          headerShown: false,
        }}
      />
      <Tab.Screen name={FIND_SCREEN_TITLE} component={FindGroupScreen} />
      <Tab.Screen
        name={FOCUS_STACK_NAME}
        component={FocusStackNav}
        options={{
          title: { FOCUS_SCREEN_TITLE },
          headerShown: false,
        }}
      />
      <Tab.Screen name={DASHBOARD_SCREEN_TITLE} component={DashboardScreen} />
      <Tab.Screen name={PROFILE_SCREEN_TITLE} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
