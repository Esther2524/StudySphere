import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../utils/Colors";
import PressableButton from "../ui/PressableButton";
import {
  doc,
  updateDoc,
  increment,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../api/FirestoreConfig";
import {
  getDayOfWeek,
  isSameDay,
  isSameWeek,
  isSameYear,
} from "../../utils/helper";
import { LinearGradient } from "expo-linear-gradient";
import Timer from "../features/focusList/Timer";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { changeRandomPicture } from '../../api/RandomImage';

export default function StandbyScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { focusID, title, duration, imageUri } = route.params;
  const [isPlaying, setIsPlaying] = useState(true);
  const [quote, setQuote] = useState({
    content: "",
    author: "",
  });

  const [randomImage, setRandomImage] = useState(null);


  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        if (data && data.content && data.author) {
          setQuote({ content: data.content, author: data.author });
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };
    fetchQuote();
  }, []);

  const handleEndCountdown = () => {
    Alert.alert(
      "Important",
      "Are you sure you want to end this focus?🥺This session will not be counted.",
      [{ text: "No" }, { text: "Yes", onPress: () => incrementBreak() }]
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
        const dayIndex = getDayOfWeek(completionTime);
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

  const handlePressChangePicture = async () => {
    try {
      const newImageUri = await changeRandomPicture();
      if (newImageUri) {
        setRandomImage(newImageUri);
      }
    } catch (error) {
      console.error("Failed to change picture:", error);
    }
  };







  return (
    <ImageBackground
      source={randomImage ? { uri: randomImage } : imageUri ? { uri: imageUri } : require('../../../assets/standby-background.jpg')}
      style={styles.standby}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>

        <PressableButton
          onPress={handlePressChangePicture}
          containerStyle={styles.changePictureButton}
        >
          <FontAwesome name='refresh' size={24} color={Colors.addFocusButton} />
        </PressableButton>

        <LinearGradient
          colors={[Colors.startColor, Colors.endColor]}
          style={styles.headerContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.header}>Stay Focus</Text>
        </LinearGradient>

        <LinearGradient
          colors={[Colors.startColor, Colors.endColor]}
          style={styles.subheadingContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.subheading}>{title} Now...</Text>
        </LinearGradient>

        <Timer
          isPlaying={isPlaying}
          duration={duration}
          onComplete={onComplete}
        />

        <LinearGradient
          colors={[Colors.startColor, Colors.endColor]}
          style={styles.quoteContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.quoteText}>"{quote.content}"</Text>
          <Text style={styles.quoteText}>— {quote.author}</Text>
        </LinearGradient>

        <PressableButton
          onPress={handleEndCountdown}
          containerStyle={styles.buttonContainer}>
          <AntDesign name='closecircleo' size={23} color={Colors.addFocusButton} />
          <Text style={styles.buttonText}>End</Text>
        </PressableButton>
      </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  standby: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  changePictureButton: {
    backgroundColor: Colors.endColor,
    padding: 8,
    position: 'absolute',
    top: 60,
    right: 30,
    zIndex: 10,
    borderRadius: 50,
  },
  headerContainer: {
    padding: 15,
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
    borderRadius: 15,
  },
  header: {
    fontSize: 25,
    fontWeight: "700",
    color: Colors.timerLabelText,
    color: "white",
  },
  subheadingContainer: {
    padding: 15,
    marginBottom: 30,
    alignItems: "center",
    borderRadius: 30,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.timerLabelText,
    color: "white",
  },
  quoteContainer: {
    padding: 15,
    alignItems: "center",
    backgroundColor: Colors.timerText,
    borderRadius: 20,
    marginTop: 30,
    width: "90%",
  },
  quoteText: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginTop: 25,
    backgroundColor: Colors.endButtonBg,
    padding: 12,
    borderRadius: 10,
  },
});
