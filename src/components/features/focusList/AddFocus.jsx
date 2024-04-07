import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import ModalView from '../../ui/ModalView';
import InputWithLabel from '../../ui/InputWithLabel';
import FormOperationBar from '../../ui/FormOperationBar';
import { Colors } from '../../../utils/Colors';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, storage, db } from '../../../api/FirestoreConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import locateFocusHandler from './LocationHelper';
import DisplayLocation from './DisplayLocation';
import ImageManager from './ImageManager';

export default function AddFocus({
  isAddFocusVisible, setIsAddFocusVisible, setIsMapVisible, closingForMap, setClosingForMap,
  currentLocation, setCurrentLocation
}) {

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [titleErrMsg, setTitleErrMsg] = useState("");
  const [DurationErrMsg, setDurationErrMsg] = useState("");

  // this is the local uri of the image
  const [imageUri, setImageUri] = useState("");


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
      setImageUri(""),
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

    let downloadImageUrl = ""; // this url is the actual url of the image in Firestore, not the local one
    if (imageUri) {
      try {
        // wait for the uploadImage function to complete and get the actual download URL
        // because uploadImage returns a Promise
        downloadImageUrl = await uploadImage(imageUri);
        console.log(downloadImageUrl); 
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

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
            quote: "",
            imageUri: downloadImageUrl,
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

  const clearLocation = () => {
    setCurrentLocation(null);
  }

  // upload the image file to Firebase Storage and get the URL of the uploaded image
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = `images/${new Date().getTime()}-${auth.currentUser.uid}-focus-background.jpg`;
    const storageRef = ref(storage, fileName);
    await uploadBytesResumable(storageRef, blob);
    const downloadUrl = await getDownloadURL(storageRef);
    // console.log(downloadUrl);
    return downloadUrl;
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
        <DisplayLocation
          currentLocation={currentLocation}
          openMapModal={openMapModal}
          clearLocation={clearLocation}
        />
        <ImageManager
          imageUri={imageUri}
          setImageUri={setImageUri}
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
    width: '90%',
  },
  title: {
    fontSize: 18,
    color: Colors.modalTitle,
    textAlign: 'center',
  },

})