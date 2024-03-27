import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../utils/Colors';
import PressableButton from '../../ui/PressableButton';

export default function FocusCard({ title, duration, onStartPress, onEditPress }) {


  return (
    <PressableButton
      onPress={onEditPress}
    >
      <View style={styles.card}>
        <View style={styles.cardText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.duration}>{duration} min</Text>
        </View>
        <View style={styles.startButton}>
          <PressableButton onPress={onStartPress}>
            <Text style={styles.startText}>Start</Text>
          </PressableButton>
        </View>
      </View>
    </PressableButton>

  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    marginRight: 20,
  },
  startText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    marginLeft: 100,
    justifyContent: 'center', // Centers children along the flex direction (default is column, so this centers vertically)
    alignItems: 'center', // Centers children perpendicular to the flex direction (so this centers horizontally)
    marginLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.title,
  },
  duration: {
    fontSize: 16,
    color: Colors.text,
    marginTop: 8,
  },
  pressed: {
    opacity: 0.5,
  },
})