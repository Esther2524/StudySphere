import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
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

  // Checks if two dates are the same day
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };


  // for addFocusTask, this focus must be created for the first time. 
  // we don't need to calculate todayStudyTime here
  const addFocusTask = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const now = new Date(); // get the current time for lastUpdate
        const durationInt = parseInt(duration, 10) || 0; 

        const newTask = {
          title: title,
          duration: durationInt,
          location: location, // optional field
          lastUpdate: Timestamp.fromDate(now),
          todayStudyTime: durationInt,
        };

        // add the focus task to Firestore and get the document reference
        const taskRef = await addDoc(collection(db, "users", user.uid, "focus"), newTask);
        console.log("Focus task added!");

        // add the first completion
        await addCompletion(taskRef);

        // close the modal upon successful addition
        setIsAddFocusVisible(false); 
      } catch (error) {
        console.error("Error adding focus task:", error);
      }
    }
  };

  const addCompletion = async (taskRef) => {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + parseInt(duration, 10) * 60000);

    const completion = {
      startTime: Timestamp.fromDate(startTime),
      endTime: Timestamp.fromDate(endTime),
    };

    // add the completion to the 'completions' sub-collection of the focus task
    await addDoc(collection(db, `${taskRef.path}/completions`), completion);
    console.log("Completion added!");
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