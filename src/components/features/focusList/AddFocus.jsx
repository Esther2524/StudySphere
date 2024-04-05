import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import ModalView from '../../ui/ModalView';
import InputWithLabel from '../../ui/InputWithLabel';
import FormOperationBar from '../../ui/FormOperationBar';
import PressableButton from '../../ui/PressableButton';
import { Colors } from '../../../utils/Colors';
import { auth, db } from '../../../api/FirestoreConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import locateFocusHandler from './LocationHelper';
import { mapsApiKey } from "@env";

export default function AddFocus({
  isAddFocusVisible, setIsAddFocusVisible, setIsMapVisible, closingForMap, setClosingForMap,
  currentLocation, setCurrentLocation
}) {

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const [titleErrMsg, setTitleErrMsg] = useState("");
  const [DurationErrMsg, setDurationErrMsg] = useState("");

  /* 
   * use useEffect to reset the form when modal is closed:
   * 1. clear the form if the users intend to create a new focus task
   * 2. don't clear the form if users go to the Map modal
   * thats why we need closingForMap here
   */
  useEffect(() => {
    // only reset these states when the modal is closed for reasons other than opening the map
    if (!isAddFocusVisible && !closingForMap) {
      setTitle("");
      setDuration("");
      setCurrentLocation(null);
      setDurationErrMsg("");
      setTitleErrMsg("");
    }

  }, [isAddFocusVisible, closingForMap]);



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
            location: currentLocation, // optional field
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
          setDurationErrMsg("");
          setTitleErrMsg("");
        } catch (error) {
          console.error("Error adding focus task:", error);
        }
      }
    }
  };

  // get the current position at the time when users open Map Modal
  const openMapModal = async () => {
    try {
      // if the currentLocation is null, we call locateFocusHandler to locate the current position
      // otherwise, just use the previous set position
      if (!currentLocation) {
        const location = await locateFocusHandler();
        if (!location) {
          console.log("Location access was denied or failed.");
          return;
        }
        setCurrentLocation(location);  // use the newly fetched location
      }

      // set closingForMap to true to indicate 
      // that this time the AddFocus modal is being closed due to opening the Map Modal
      // then useEffect will not work (data will not be cleared), even if isAddFocusVisible is false
      setClosingForMap(true);
      setIsAddFocusVisible(false);
      setIsMapVisible(true);

    } catch (error) {
      console.error("Error getting location: ", error);
    }
  };




  return (
    <ModalView isVisible={isAddFocusVisible}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Add a New Focus</Text>
        <InputWithLabel
          label="Title *"
          labelStyle={{ color: Colors.addFocusMedalLabel }}
          content={title}
          setContent={setTitle}
          placeholder="e.g. Study Python"
          containerStyle={{ width: '100%' }}
          errorMsg={titleErrMsg}
        />
        <InputWithLabel
          label="Duration(min) *"
          labelStyle={{ color: Colors.addFocusMedalLabel }}
          content={duration}
          setContent={setDuration}
          placeholder="e.g. 25"
          containerStyle={{ width: '100%', marginBottom: 20 }}
          keyboardType='numeric'
          errorMsg={DurationErrMsg}
        />
        <View style={styles.locationArea}>
          <PressableButton
            onPress={openMapModal}
            containerStyle={styles.buttonContainer}
          >
            <Text style={styles.buttonTitle}>Select Location</Text>
          </PressableButton>
          {currentLocation &&
            <Image
              style={styles.image}
              source={{
                uri: `https://maps.googleapis.com/maps/api/staticmap?center=${currentLocation.latitude},${currentLocation.longitude}&zoom=16&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${currentLocation.latitude},${currentLocation.longitude}&key=${mapsApiKey}`,
              }}
            />
          }
        </View>
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
    width: '90%',
  },
  title: {
    fontSize: 18,
    color: Colors.modalTitle,
    textAlign: 'center',
  },
  locationArea: {
    marginBottom: 20,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: Colors.timerText,
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 5,
  },
  image: {
    height: 100,
    borderRadius: 10,
    marginHorizontal: 10,
  },
})