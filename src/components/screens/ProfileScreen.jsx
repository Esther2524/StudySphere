import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../utils/Colors';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
  },
})