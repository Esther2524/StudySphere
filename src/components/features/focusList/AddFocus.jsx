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
  const [location, setLocation] = useState([]);


  const addFocusTask = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const newTask = {
          title: title,
          duration: parseInt(duration, 10) || 0,
          // location is an optional field in the documents (set to null for now)
          location: null,
        };

        // add the focus task to Firestore and get the document reference
        const taskRef = await addDoc(collection(db, "users", user.uid, "focus"), newTask);
        console.log("Focus task added!");

        // Optionally, immediately add a completion to this new focus task
        await addInitialCompletion(taskRef);

        setIsAddFocusVisible(false); // Close the modal upon successful addition
      } catch (error) {
        console.error("Error adding focus task:", error);
      }
    }
  };

  const addInitialCompletion = async (taskRef) => {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + parseInt(duration, 10) * 60000);

    const completion = {
      startTime: Timestamp.fromDate(startTime),
      endTime: Timestamp.fromDate(endTime),
    };

    // Add the completion to the 'completions' sub-collection of the focus task
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