import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from "lottie-react-native";
import { Colors } from '../../utils/Colors';

export default function LottieDisplay() {
  return (
    <View style={styles.placeholderContainer}>
        <LottieView
          source={require("../../../assets/placeholder-FocusScreen.json")}
          style={{ width: "80%", height: "70%" }}
          autoPlay
          loop={true}
        />
      <Text style={styles.placeholderText}>
        press the add button in the top right to add a new focus task
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    marginTop: 150,
  },
  placeholderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  }
})