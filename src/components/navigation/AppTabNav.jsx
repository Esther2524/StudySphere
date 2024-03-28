import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import FindGroupScreen from "../screens/FindGroupScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GroupStackNav from "./GroupStackNav";
import { Colors } from "../../utils/Colors";
import FocusStackNav from "./FocusStackNav";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Focus List" // Set the initial screen
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;
          let iconName;

          if (route.name === 'Group Nav') {
            IconComponent = Ionicons;
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Find Group') {
            IconComponent = Ionicons;
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Focus List') {
            IconComponent = Ionicons;
            iconName = focused ? 'duplicate' : 'duplicate-outline';
          } else if (route.name === 'Dashboard') {
            IconComponent = Ionicons;
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Profile') {
            IconComponent = Ionicons;
            iconName = focused ? 'person' : 'person-outline';
          }
          return <IconComponent name={iconName} size={28} color={color} />;
        },

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
    </Tab.Navigator >
  );
}

const styles = StyleSheet.create({});
