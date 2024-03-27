import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import ModalView from '../../ui/ModalView';
import InputWithLabel from '../../ui/InputWithLabel';
import FormOperationBar from '../../ui/FormOperationBar';
import { Colors } from '../../../utils/Colors';
import { auth, db } from '../../../api/FirestoreConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export default function AddFocus({ isAddFocusVisible, setIsAddFocusVisible }) {

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState(null);

  // use useEffect to reset the form when modal is closed
  useEffect(() => {
    if (!isAddFocusVisible) {
      setTitle("");
      setDuration("");
      setLocation(null);
    }
  }, [isAddFocusVisible]);

  // check the title and the durarion are valid
  const validateInput = () => {
    if (!title.trim()) {
      alert("Focus's title cannot be empty!");
      return false;
    }

    const durationNum = parseInt(duration, 10);
    if (isNaN(durationNum) || durationNum <= 0) {
      alert("Duration must be a positive number!");
      return false;
    }

    return true;
  }


  // for addFocusTask, this focus must be created for the first time. 
  // we don't need to calculate todayStudyTime here
  const addFocusTask = async () => {
    const user = auth.currentUser;
    if (user && validateInput()) {
      if (user) {
        try {
          const now = new Date(); // get the current time for lastUpdate
          const durationInt = parseInt(duration, 10) || 0;

          const newTask = {
            title: title,
            duration: durationInt,
            location: location, // optional field
            lastUpdate: Timestamp.fromDate(now),
            todayBreaks: 0,
            todayTimes: 0,
            weeklyStudyTime: new Array(7).fill(0), // 7 days in a week
            monthlyStudyTime: new Array(12).fill(0), // 12 months in a year
          };

          await addDoc(collection(db, "users", user.uid, "focus"), newTask);
          console.log("Focus task added!");

          // close the modal upon successful addition
          setIsAddFocusVisible(false);
        } catch (error) {
          console.error("Error adding focus task:", error);
        }
      }
    }
  };



  return (
    <ModalView isVisible={isAddFocusVisible}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Add a New Focus!</Text>
        <InputWithLabel
          label="Title *"
          labelStyle={{ color: Colors.addFocusMedalLabel }}
          content={title}
          setContent={setTitle}
          placeholder="e.g. Study Python"
          containerStyle={{ width: '100%' }}
        />
        <InputWithLabel
          label="Duration(min) *"
          labelStyle={{ color: Colors.addFocusMedalLabel }}
          content={duration}
          setContent={setDuration}
          placeholder="e.g. 25"
          containerStyle={{ width: '100%' }}
          keyboardType='numeric'
        />
        <FormOperationBar
          confirmText="Add"
          cancelText="Cancel"
          confirmHandler={addFocusTask}
          cancelHandler={() => { setIsAddFocusVisible(false) }}
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
    width: '80%',
  },
  title: {
    fontSize: 18,
    color: Colors.modalTitle,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
  }
})