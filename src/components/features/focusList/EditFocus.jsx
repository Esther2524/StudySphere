import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import ModalView from '../../ui/ModalView';
import InputWithLabel from '../../ui/InputWithLabel';
import FormOperationBar from '../../ui/FormOperationBar';
import { Colors } from '../../../utils/Colors';
import { auth, db } from '../../../api/FirestoreConfig';
import { updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

export default function EditFocus({ isEditFocusVisible, setIsEditFocusVisible, focusID }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState(null);
  const user = auth.currentUser;


  // use useEffect to reset the form when modal is closed
  useEffect(() => {
    if (!isEditFocusVisible) {
      setTitle("");
      setDuration("");
      setLocation(null);
    }
  }, [isEditFocusVisible]);

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

  const handleEditFocus = () => {
    if (!validateInput()) return;
    Alert.alert(
      "Important",
      "Are you sure you want to edit this focus?",
      [
        { text: "No" },
        { text: "Yes", onPress: () => editFocusTask() } 
      ]
    );
  }




  const editFocusTask = async () => {
    const focusRef = doc(db, "users", user.uid, "focus", focusID);
    try {
      await updateDoc(focusRef, {
        title: title,
        duration: duration,
      })
      console.log("Focus task updated!");
      setIsEditFocusVisible(false);
    } catch (error) {
      console.error("Error updating focus task:", error);
    }
  }

  const handleDeleteFocus = () => {
    Alert.alert(
      "Important",
      "Are you sure you want to delete this focus?",
      [
        { text: "No" },
        { text: "Yes", onPress: () => deleteFocusTask() } // button to confirm editing
      ]
    );
  }

  const deleteFocusTask = async () => {
    const focusRef = doc(db, "users", user.uid, "focus", focusID);
    try {
      await deleteDoc(focusRef);
      console.log("Focus task deleted!");
      setIsEditFocusVisible(false);
    } catch (error) {
      console.error("Error updating focus task:", error);
    }
  }



  return (
    <ModalView isVisible={isEditFocusVisible}>
      <View style={styles.modalView}>
        <View style={styles.headerLine}>
          <View style={styles.placeholder}>
            {/* Invisible placeholder to balance the delete button and center the title */}
          </View>
          <Text style={styles.title}>Edit a Focus</Text>
          <Pressable onPress={handleDeleteFocus}>
            <AntDesign name="delete" size={24} color={Colors.deleteButton} />
          </Pressable>
        </View>

        <InputWithLabel
          label="Title *"
          labelStyle={{ color: Colors.addFocusMedalLabel }}
          content={title}
          setContent={setTitle}
          containerStyle={{ width: '100%' }}
        />
        <InputWithLabel
          label="Duration(min) *"
          labelStyle={{ color: Colors.addFocusMedalLabel }}
          content={duration}
          setContent={setDuration}
          containerStyle={{ width: '100%' }}
          keyboardType='numeric'
        />
        <FormOperationBar
          confirmText="Edit"
          cancelText="Cancel"
          confirmHandler={handleEditFocus}
          cancelHandler={() => { setIsEditFocusVisible(false) }}
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
  headerLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
  },
  placeholder: {
    width: 24, // Match the delete button's width
    height: 24, // Match the delete button's height
  },
})