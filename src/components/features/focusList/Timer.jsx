import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Colors } from '../../../utils/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function Timer({ isPlaying, duration, onComplete }) {
  return (
    <LinearGradient
      style={styles.timerContainer}
      colors={[Colors.timerBgStartColor, Colors.timerBgEndColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <CountdownCircleTimer
        isPlaying={isPlaying}
        size={200}
        strokeWidth={20}
        duration={duration * 60}
        colors={[Colors.timerPrimary]}
        onComplete={onComplete}
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
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  timerContainer: {
    borderRadius: 100,
  },
  timerText: {
    fontSize: 40,
    color: Colors.timerInnerText,
    fontWeight: '700',
  },
})