import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../utils/Colors';

export default function FocusScreen() {
  return (
    <View style={styles.container}>
      <Text>FocusScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
  },
})