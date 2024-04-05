import { StyleSheet, Text, View, Platform, Alert } from "react-native";
import React, { useState } from "react";
import ModalView from "../../ui/ModalView";
import FormOperationBar from "../../ui/FormOperationBar";
import DateTimePicker from "@react-native-community/datetimepicker";
import PressableButton from "../../ui/PressableButton";
import { Colors } from "../../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { scheduleReminder } from "../../../api/notificationHelper";
import * as Notifications from "expo-notifications";
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
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const confirmReminder = () => {
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
    setReminderRepeat("");
    setShowPicker(false);
    setReminderTime(new Date());
    setIsReminderVisible(false);
  };

  const handleDeleteReminder = () => {
    Alert.alert("Important", "Are you sure you want to delete this reminder?", [
      { text: "No" },
      { text: "Yes", onPress: () => deleteReminder() },
    ]);
  };

  const showTimepicker = () => {
    setShowPicker(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
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
              onPress={() => setReminderRepeat(REMINDER_TYPE_DAILY)}
              containerStyle={buttonStyles(REMINDER_TYPE_DAILY)}
            >
              <Text>{REMINDER_TYPE_DAILY}</Text>
            </PressableButton>
            <PressableButton
              onPress={() => setReminderRepeat(REMINDER_TYPE_WEEKDAY)}
              containerStyle={buttonStyles(REMINDER_TYPE_WEEKDAY)}
            >
              <Text>{REMINDER_TYPE_WEEKDAY}</Text>
            </PressableButton>
            <PressableButton
              onPress={() => setReminderRepeat(REMINDER_TYPE_WEEKEND)}
              containerStyle={buttonStyles(REMINDER_TYPE_WEEKEND)}
            >
              <Text>{REMINDER_TYPE_WEEKEND}</Text>
            </PressableButton>
          </View>
        </View>

        <View style={styles.selectTimeArea}>
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
              onChange={onChange}
            />
          )}
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 10,
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
});
