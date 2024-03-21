import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import FindGroupScreen from '../screens/FindGroupScreen';
import FocusScreen from '../screens/FocusScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StudyGroupScreen from '../screens/StudyGroupScreen';

const Tab = createBottomTabNavigator();

export default function AppTabNav() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Study Group" component={StudyGroupScreen} />
			<Tab.Screen name="Find Group" component={FindGroupScreen} />
			<Tab.Screen name="Focus List" component={FocusScreen} />
			<Tab.Screen name="Dashboard" component={DashboardScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	)
}

const styles = StyleSheet.create({})