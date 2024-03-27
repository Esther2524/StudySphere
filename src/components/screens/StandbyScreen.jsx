import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Colors } from '../../utils/Colors';
import PressableButton from '../ui/PressableButton';

export default function StandbyScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { duration } = route.params;

  return (
    <SafeAreaView style={styles.fullScreen}>
      <View style={styles.container}>
        <Text style={styles.header}>Stay Focus</Text>
        <CountdownCircleTimer
          isPlaying
          duration={duration * 60} // Convert minutes to seconds
          colors={[Colors.primary, Colors.secondary]}
          onComplete={() => {
            // Handle completion
            navigation.goBack();
            return [false, 0]; // Don't repeat the timer
          }}
        >
          {({ remainingTime }) => {
            // Convert remaining time into minutes and seconds
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            // Format time as MM:SS
            const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            return <Text style={styles.timerText}>{formattedTime}</Text>;
          }}
        </CountdownCircleTimer>
        <PressableButton
          onPress={() => navigation.goBack()}
          containerStyle={styles.buttonContainer}>
          <Text style={styles.buttonText}>End</Text>
        </PressableButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    marginVertical: 50,
  },
  timerText: {
    fontSize: 32,
    color: Colors.timerText,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.buttonText,
  },
  buttonContainer: {
    marginTop: 30,
    backgroundColor: Colors.buttonBackground,
    padding: 10,
    borderRadius: 10,
  },
});
