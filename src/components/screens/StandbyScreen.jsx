import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Colors } from '../../utils/Colors';
import PressableButton from '../ui/PressableButton';
import { doc, updateDoc, increment, getDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../api/FirestoreConfig';
import { isSameDay, isSameWeek, isSameYear } from '../../utils/helper';


export default function StandbyScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { focusID, title, duration, imageUri } = route.params;
  const [isPlaying, setIsPlaying] = useState(true);

  const handleEndCountdown = () => {
    Alert.alert(
      "Important",
      "Are you sure you want to end this focus? This session will not be counted.",
      [
        { text: "No" },
        { text: "Yes", onPress: () => incrementBreak() }
      ]
    );

  };

  const incrementBreak = async () => {
    setIsPlaying(false);
    if (focusID) {
      const now = new Date();

      const focusRef = doc(db, "users", auth.currentUser.uid, "focus", focusID);
      const focusDoc = await getDoc(focusRef);

      if (focusDoc.exists()) {
        const focusData = focusDoc.data();
        const sameDay = isSameDay(focusData.lastUpdate);

        await updateDoc(focusRef, {
          lastUpdate: Timestamp.fromDate(now),
          // Increment todayBreaks for this focus task if it's the sameday. otherwite, reset it to 1
          todayBreaks: sameDay ? increment(1) : 1,
          // Reset todayTimes if not the same day
          todayTimes: sameDay ? focusData.todayTimes : 0,
        });
      }
    }
    navigation.goBack(); // quit the countdown
  };


  const onComplete = async () => {
    const completionTime = new Date(); // Get the current time as the completion time

    if (focusID) {
      const focusRef = doc(db, "users", auth.currentUser.uid, "focus", focusID);
      const focusDoc = await getDoc(focusRef);

      if (focusDoc.exists()) {
        const focusData = focusDoc.data();
        const sameDay = isSameDay(focusData.lastUpdate);
        const sameWeek = isSameWeek(focusData.lastUpdate);
        const sameYear = isSameYear(focusData.lastUpdate);

        // Determine the indexes for updating weekly and monthly study time
        // const dayIndex = completionTime.getDay(); // 0 (Sunday) to 6 (Saturday)
        const dayOfWeek = completionTime.getDay();
        const dayIndex = (dayOfWeek + 6) % 7;
        const monthIndex = completionTime.getMonth(); // 0 (January) to 11 (December)

        // Update weeklyStudyTime and monthlyStudyTime
        let updatedWeeklyStudyTime = [...focusData.weeklyStudyTime];
        let updatedMonthlyStudyTime = [...focusData.monthlyStudyTime];


        if (!sameYear) {
          updatedMonthlyStudyTime = new Array(12).fill(0);
        }

        // Reset weeklyStudyTime if the current completion time and lastUpdate are not within the same week
        if (!sameWeek) {
          updatedWeeklyStudyTime = new Array(7).fill(0);
        }

        if (sameDay) {
          updatedWeeklyStudyTime[dayIndex] += duration;
          updatedMonthlyStudyTime[monthIndex] += duration;
        } else {
          updatedWeeklyStudyTime[dayIndex] = duration;
          updatedMonthlyStudyTime[monthIndex] += duration;
        }

        await updateDoc(focusRef, {
          lastUpdate: Timestamp.fromDate(completionTime),
          weeklyStudyTime: updatedWeeklyStudyTime,
          monthlyStudyTime: updatedMonthlyStudyTime,
          todayTimes: sameDay ? focusData.todayTimes + 1 : 1,
          todayBreaks: sameDay ? focusData.todayBreaks : 0,
        });
      }
    }
    navigation.goBack();
    return [false, 0]; // Don't repeat the timer
  };



  return (
    <SafeAreaView style={styles.fullScreen}>
      <ImageBackground
        source={imageUri ? { uri: imageUri } : require('../../../assets/standby-background.jpg')}
        style={styles.standby}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>

          <View style={styles.headerContainer}>
            <Text style={styles.header}>Stay Focus</Text>
            <Text style={styles.subheading}>{title}</Text>
          </View>

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

          <PressableButton
            onPress={handleEndCountdown}
            containerStyle={styles.buttonContainer}>
            <Text style={styles.buttonText}>End</Text>
          </PressableButton>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  standby: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: Colors.timerText, // Semi-transparent background
    padding: 15,
    marginBottom: 30,
    alignItems: 'center', 
    borderRadius: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: '700',
    color: Colors.timerLabelText,
    marginBottom: 20,
    color: 'white',
  },
  subheading: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.timerLabelText,
    color: 'white',
  },
  timerText: {
    fontSize: 40,
    color: Colors.timerPrimary,
    fontWeight: '700',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    marginTop: 30,
    backgroundColor: Colors.timerText,
    padding: 12,
    borderRadius: 10,
  },
});
