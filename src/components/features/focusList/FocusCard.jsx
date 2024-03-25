import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../utils/Colors';

export default function FocusCard({ title, duration }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.duration}>{duration} min</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white", // Define this color in your Colors.js or adjust as needed
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.title, // Define this color in your Colors.js or adjust as needed
  },
  duration: {
    fontSize: 16,
    color: Colors.text, // Define this color in your Colors.js or adjust as needed
    marginTop: 8,
  },
})