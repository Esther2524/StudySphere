import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../utils/Colors';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text>DashboardScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
  },
})