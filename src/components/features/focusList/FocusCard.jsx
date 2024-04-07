import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../utils/Colors';
import PressableButton from '../../ui/PressableButton';
import { limitStrLen } from '../../../utils/helper';
import { AntDesign } from '@expo/vector-icons';

export default function FocusCard({
  title, duration,
  todayTimes, onStartPress, onEditPress
}) {

  return (
    <PressableButton
      onPress={onEditPress}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <Text style={styles.title}>{limitStrLen(title, 20)}</Text>
          <View style={styles.secondLine}>
            <Text style={styles.duration}>{duration} min</Text>
            {
              todayTimes >= 1 ? (
                <>
                  <AntDesign style={styles.icon} name="checkcircle" size={24} color={Colors.deleteButton} />
                  <Text style={styles.studyTimes}>{todayTimes}</Text>
                </>
              ) : (
                <AntDesign style={styles.icon} name="checkcircleo" size={24} color={Colors.deleteButton} />
              )
            }
          </View>
        </View>
        <PressableButton
          onPress={onStartPress}
          containerStyle={styles.startButton}
        >
          <Text style={styles.startText}>Start</Text>
        </PressableButton>
      </View>
    </PressableButton >


  )
}

const styles = StyleSheet.create({
  cardContent: {
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
    padding: 10, // Add padding to increase the touchable area
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.title,
  },
  pressed: {
    opacity: 0.5,
  },
  secondLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 16,
    color: Colors.text,
    marginTop: 8,
    marginRight: 12,
  },
  icon: {
    marginTop: 8,
  },
  studyTimes: {
    fontSize: 15,
    marginTop: 9,
    marginLeft: 3,
    color: Colors.greyIconColor,
  },


})