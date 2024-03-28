import { StyleSheet, Text, View, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import ModalView from '../../ui/ModalView';
import FormOperationBar from '../../ui/FormOperationBar';
import DateTimePicker from '@react-native-community/datetimepicker';
import PressableButton from '../../ui/PressableButton';
import { Colors } from '../../../utils/Colors';
import { AntDesign } from '@expo/vector-icons';

export default function AddReminder({ isReminderVisible, setIsReminderVisible }) {
  const [reminderRepeat, setReminderRepeat] = useState("");
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const confirmReminder = () => {
    // TODO
    console.log(reminderRepeat, reminderTime);
    setIsReminderVisible(false);
  }

  const handleDeleteReminder = () => {
    Alert.alert(
      "Important",
      "Are you sure you want to delete this reminder?",
      [
        { text: "No" },
        { text: "Yes", onPress: () => deleteReminder() }
      ]
    );
  };

  const deleteReminder = () => {
    setReminderRepeat("");
    setShowPicker(false);
    setReminderTime(new Date());
    setIsReminderVisible(false);
  };

  const showTimepicker = () => {
    setShowPicker(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setReminderTime(currentDate);
  };

  const buttonStyles = (mode) => ({
    backgroundColor: mode === reminderRepeat ? Colors.selectedRepeat : Colors.unselectedRepeat,
    margin: 4,
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
            <AntDesign name="delete" size={24} color={Colors.deleteButton} />
          </PressableButton>
        </View>


        <View style={styles.selectRepeatArea}>
          <Text style={styles.repeatLabel}>Repeat Mode</Text>
          <View style={styles.buttonContainer}>
            <PressableButton
              onPress={() => setReminderRepeat("Every Day")}
              containerStyle={buttonStyles("Every Day")}
            >
              <Text>Every Day</Text>
            </PressableButton>
            <PressableButton
              onPress={() => setReminderRepeat("Every Weekday")}
              containerStyle={buttonStyles("Every Weekday")}
            >
              <Text>Every Weekday</Text>
            </PressableButton>
            <PressableButton
              onPress={() => setReminderRepeat("Every Weekend")}
              containerStyle={buttonStyles("Every Weekend")}
            >
              <Text>Every Weekday</Text>
            </PressableButton>
          </View>
        </View>

        <View style={styles.selectTimeArea}>
          <PressableButton
            onPress={showTimepicker}
            containerStyle={styles.timeButton}
          >
            <Text style={styles.timeText}>Choose Reminder Time</Text>
          </PressableButton>
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={reminderTime}
              mode={'time'}
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
          cancelHandler={() => { setIsReminderVisible(false) }}
        />
      </View>
    </ModalView>
  )
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    color: Colors.modalTitle,
    textAlign: 'center',
  },
  headerLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectRepeatArea: {
    marginTop: 20,
    marginBottom: 10,
  },
  repeatLabel: {
    marginBottom: 10,
    fontSize: 15,
  },
  button: {
    marginRight: 5,
    marginLeft: 5,
    padding: 7,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectTimeArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  timeButton: {
    backgroundColor: Colors.selectTime,
    padding: 7,
    borderRadius: 10,
  },
  timeText: {

  }
})