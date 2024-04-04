import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StandbyScreen from '../screens/StandbyScreen';
import FocusScreen from '../screens/FocusScreen';
import { Colors } from '../../utils/Colors';
import Map from '../screens/Map';

export default function FocusStackNav() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Focus Tasks"
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
      <Stack.Screen name="Focus Tasks" component={FocusScreen} />
      <Stack.Screen 
        name="Standby" 
        component={StandbyScreen} 
        options={{ 
          presentation: 'modal', // covers the entire previous screen, including any bottom tabs or upper areas like the navigation bar,
          headerShown: false, 
        }} 
      />
      <Stack.Screen name="Map" component={Map}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})