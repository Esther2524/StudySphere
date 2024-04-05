import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import ModalView from '../../ui/ModalView';
import InputWithLabel from '../../ui/InputWithLabel';
import FormOperationBar from '../../ui/FormOperationBar';
import { Colors } from '../../../utils/Colors';
import { auth, db } from '../../../api/FirestoreConfig';
import { updateDoc, deleteDoc, doc, Timestamp, getDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import PressableButton from '../../ui/PressableButton';
import DisplayLocation from './DisplayLocation';
import locateFocusHandler from './LocationHelper';


export default function EditFocus({
  isEditFocusVisible, setIsEditFocusVisible, setIsFromEdit,
  focusTitle, focusDuration, focusLocation, focusID, setFocusLocation,
  setIsMapVisible, currentLocation, setCurrentLocation
}) {

  const user = auth.currentUser;
  const [title, setTitle] = useState(focusTitle);
  const [duration, setDuration] = useState(focusDuration.toString());
  const [titleErrMsg, setTitleErrMsg] = useState("");
  const [DurationErrMsg, setDurationErrMsg] = useState("");


  // ensure input fields are always populated with the most current data passed to the EditFocus component
  useEffect(() => {
    setTitle(focusTitle);
    setDuration(focusDuration.toString());
    setCurrentLocation(focusLocation); // use the focus's location to set currentLocation
    setDurationErrMsg("");
    setTitleErrMsg("");
  }, [focusTitle, focusDuration, focusLocation]);

  // console.log("currentLocation", currentLocation);
  // console.log("focus location", focusLocation);



  // check the title and the durarion are valid
  const validateInput = () => {
    let isValid = true;
    setTitleErrMsg('');
    setDurationErrMsg('');

    if (!title.trim()) {
      setTitleErrMsg("Focus's title cannot be empty");
      isValid = false;
    }
    const durationNum = parseInt(duration, 10);
    if (isNaN(durationNum) || durationNum <= 0) {
      setDurationErrMsg("Duration must be a positive number");
      isValid = false;
    }
    return isValid;
  }


  const editFocusTask = async () => {
    if (!validateInput(title, duration)) return;

    const focusRef = doc(db, "users", user.uid, "focus", focusID);
    try {
      await updateDoc(focusRef, {
        title: title,
        duration: parseInt(duration, 10),
        location: currentLocation,
      })
      console.log("Focus task updated!");
      setIsEditFocusVisible(false);
      setDurationErrMsg("");
      setTitleErrMsg("");
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
    // update UI first to reflect the outcome of the deletion quickly
    setIsEditFocusVisible(false);
    setDurationErrMsg("");
    setTitleErrMsg("");
    try {
      await deleteDoc(focusRef);
      console.log("Focus task deleted!");
      setCurrentLocation(null);
    } catch (error) {
      console.error("Error deleting focus task:", error);
    }
  }


  const openMapModal = async () => {
    // currentLocation with null means location is cleared, so we need to get the current position
    try {
      if (!currentLocation) {
        const location = await locateFocusHandler();
        if (!location) {
          console.log("Location access was denied or failed.");
          return;
        }
        setCurrentLocation(location);  // use the newly fetched location
      }
      setIsFromEdit(true);
      setIsEditFocusVisible(false);
      setIsMapVisible(true);
    } catch (error) {
      console.error("Error getting location: ", error);
    }
  };


  const clearLocation = () => {
    setCurrentLocation(null);
    setFocusLocation(null);
  }




  return (
    <ModalView isVisible={isEditFocusVisible}>
      <View style={styles.modalView}>
        <View style={styles.headerLine}>
          <View style={styles.placeholder}>
            {/* Invisible placeholder to balance the delete button and center the title */}
          </View>
          <Text style={styles.title}>Edit a Focus</Text>
          <PressableButton
            onPress={handleDeleteFocus}
            containerStyle={{ marginRight: 15 }}
          >
            <AntDesign name="delete" size={22} color={Colors.deleteButton} />
          </PressableButton>
        </View>

        <InputWithLabel
          label="Title *"
          labelStyle={{ color: Colors.addFocusMedalLabel }}
          content={title}
          setContent={setTitle}
          containerStyle={{ width: '100%' }}
          errorMsg={titleErrMsg}
        />
        <InputWithLabel
          label="Duration(min) *"
          labelStyle={{ color: Colors.addFocusMedalLabel }}
          content={duration}
          setContent={setDuration}
          containerStyle={{ width: '100%', marginBottom: 20 }}
          keyboardType='numeric'
          errorMsg={DurationErrMsg}
        />
        <DisplayLocation
          currentLocation={currentLocation || focusLocation}
          openMapModal={openMapModal}
          clearLocation={clearLocation}
        />

        <FormOperationBar
          confirmText="Edit"
          cancelText="Cancel"
          confirmHandler={editFocusTask}
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
    width: '90%',
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