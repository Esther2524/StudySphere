import { StyleSheet, Text, View, Platform, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ModalView from "../../ui/ModalView";
import FormOperationBar from "../../ui/FormOperationBar";
import DateTimePicker from "@react-native-community/datetimepicker";
import PressableButton from "../../ui/PressableButton";
import { Colors } from "../../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  reminderLengthToType,
  scheduleReminder,
} from "../../../api/notificationHelper";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import {
  REMINDER_MSG,
  REMINDER_TITLE,
  REMINDER_TYPE_DAILY,
  REMINDER_TYPE_WEEKDAY,
  REMINDER_TYPE_WEEKEND,
} from "../../../utils/constants";

export default function AddReminder({
  isReminderVisible,
  setIsReminderVisible,
}) {
  const [reminderRepeat, setReminderRepeat] = useState("");
  const [reminderTime, setReminderTime] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [err, setErr] = useState({
    repeatModeErr: "",
    reminderTimeErr: "",
  });

  function clearRepeatModeErr() {
    setErr((pre) => ({
      ...pre,
      repeatModeErr: "",
    }));
  }

  const confirmReminder = async () => {
    let isValid = true;
    if (!reminderRepeat) {
      setErr((pre) => ({
        ...pre,
        repeatModeErr: "Please choose repeat mode!",
      }));
      isValid = false;
    }
    if (!reminderTime) {
      setErr((pre) => ({
        ...pre,
        reminderTimeErr: "Please choose reminder time!",
      }));
      isValid = false;
    }
    if (!isValid) return;

    // different from official docs, IOS simulator now supports notification
    if (!Device.isDevice && Platform.OS === "android") {
      Alert.alert("Reminder can only be set on physical device!");
      return;
    }
    await Notifications.cancelAllScheduledNotificationsAsync();
    scheduleReminder({
      title: REMINDER_TITLE,
      message: REMINDER_MSG,
      time: reminderTime,
      reminderType: reminderRepeat,
    });
    setIsReminderVisible(false);
  };

  const deleteReminder = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
    setIsReminderVisible(false);
  };

  const handleDeleteReminder = () => {
    Alert.alert("Important", "Are you sure you want to delete this reminder?", [
      { text: "No" },
      { text: "Yes", onPress: () => deleteReminder() },
    ]);
  };

  const showTimepicker = () => {
    if (!reminderTime) setReminderTime(new Date());
    setShowPicker(true);
  };

  const onChangeReminderTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setErr((pre) => ({
      ...pre,
      reminderTimeErr: "",
    }));
    setShowPicker(Platform.OS === "ios");
    setReminderTime(currentDate);
  };

  const buttonStyles = (mode) => ({
    backgroundColor:
      mode === reminderRepeat ? Colors.selectedRepeat : Colors.unselectedRepeat,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
  });

  useEffect(() => {
    async function showLocalNotif() {
      if (!Device.isDevice) {
        return;
      }
      const currentNotif =
        await Notifications.getAllScheduledNotificationsAsync();
      const dateComponents = currentNotif[0]?.trigger?.dateComponents;
      const currentNotifTime = new Date();

      // This means we do have a reminder set by user
      // So we need to display it
      if (dateComponents) {
        currentNotifTime.setHours(
          dateComponents.hour,
          dateComponents.minute,
          0,
          0
        );
        showTimepicker();
        setReminderTime(currentNotifTime);
        setReminderRepeat(reminderLengthToType[currentNotif.length]);
      }
    }
    showLocalNotif();
  }, []);

  return (
    <ModalView isVisible={isReminderVisible}>
      <View style={styles.modalView}>
        <View style={styles.headerLine}>
          <View style={styles.placeholder}>
            {/* Invisible placeholder to balance the delete button and center the title */}
          </View>
          <Text style={styles.header}>Focus Reminder</Text>
          <PressableButton onPress={handleDeleteReminder}>
            <Ionicons
              name="trash-outline"
              size={24}
              color={Colors.deleteButton}
            />
          </PressableButton>
        </View>

        <View style={styles.selectRepeatArea}>
          <Text style={styles.repeatLabel}>Repeat Mode</Text>
          <View style={styles.buttonContainer}>
            <PressableButton
              onPress={() => {
                setReminderRepeat(REMINDER_TYPE_DAILY);
                clearRepeatModeErr();
              }}
              containerStyle={buttonStyles(REMINDER_TYPE_DAILY)}
            >
              <Text>{REMINDER_TYPE_DAILY}</Text>
            </PressableButton>
            <PressableButton
              onPress={() => {
                setReminderRepeat(REMINDER_TYPE_WEEKDAY);
                clearRepeatModeErr();
              }}
              containerStyle={buttonStyles(REMINDER_TYPE_WEEKDAY)}
            >
              <Text>{REMINDER_TYPE_WEEKDAY}</Text>
            </PressableButton>
            <PressableButton
              onPress={() => {
                setReminderRepeat(REMINDER_TYPE_WEEKEND);
                clearRepeatModeErr();
              }}
              containerStyle={buttonStyles(REMINDER_TYPE_WEEKEND)}
            >
              <Text>{REMINDER_TYPE_WEEKEND}</Text>
            </PressableButton>
          </View>
          <Text style={styles.errMsg}>{err.repeatModeErr}</Text>
        </View>

        <View style={styles.selectTimeArea}>
          <View style={styles.selectTimeLineOne}>
            <PressableButton
              onPress={showTimepicker}
              containerStyle={styles.timeButton}
            >
              <Text style={styles.timeText}>Reminder Time</Text>
            </PressableButton>
            {showPicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={reminderTime}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={onChangeReminderTime}
              />
            )}
          </View>
          <View>
            <Text style={styles.errMsg}>{err.reminderTimeErr}</Text>
          </View>
        </View>

        <FormOperationBar
          confirmText="Confirm"
          confirmHandler={confirmReminder}
          cancelText="Cancel"
          cancelHandler={() => {
            setIsReminderVisible(false);
          }}
        />
      </View>
    </ModalView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    width: "90%",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    color: Colors.modalTitle,
    textAlign: "center",
  },
  headerLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectRepeatArea: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    height: 90,
  },
  repeatLabel: {
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    marginRight: 5,
    marginLeft: 5,
    padding: 7,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectTimeArea: {
    marginBottom: 10,
    marginLeft: 10,
    height: 60,
  },
  selectTimeLineOne: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeButton: {
    backgroundColor: Colors.selectTime,
    padding: 10,
    borderRadius: 10,
  },
  timeText: {},
  placeholder: {
    width: 24,
  },
  errMsg: {
    color: Colors.dangerTextColor,
    marginTop: 5,
  },
});
