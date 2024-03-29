import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { Colors } from "../../utils/Colors";

export default function AuthStackNav() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
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
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign up" component={SignupScreen} />
    </Stack.Navigator>
  );
}
