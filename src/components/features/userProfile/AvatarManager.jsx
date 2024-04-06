import { StyleSheet, Text, View, Image, Alter } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import { Alert } from 'react-native';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage, db } from '../../../api/FirestoreConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { Avatar } from '@rneui/themed';


const DEFAULT_AVATAR = require('../../../../assets/defaultAvatar.jpg');

export default function AvatarManager({ userData }) {

  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    try {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (err) {
      console.log(err);
    }
  };

  // upload the image file to Firebase Storage and get the URL of the uploaded image
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    // convert the image URI to a blob
    const blob = await response.blob();

    // a unique file name for the image
    const fileName = `images/${new Date().getTime()}-profile.jpg`;
    const storageRef = ref(storage, fileName);

    // upload the blob to Firebase Storage
    await uploadBytes(storageRef, blob);

    // get the download URL of the uploaded image
    const downloadUrl = await getDownloadURL(storageRef);
    // console.log(downloadUrl);
    return downloadUrl;
  };


  const updateUserAvatar = async (downloadUrl) => {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      avatar: downloadUrl,
    });
  };



  const takeImageOrChooseFromAlbum = async () => {
    const havePermission = await verifyPermission();
    if (!havePermission) {
      Alert.alert("You need to give permission");
      return null;
    }

    // show action sheet to choose between camera or gallery
    Alert.alert(
      'Select Avatar',
      'Would you like to take a new photo or choose an existing one?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Take Photo',
          onPress: () => handleTakePhoto(),
        },
        {
          text: 'Choose from Album',
          onPress: () => handleChooseFromAlbum(),
        },
      ],
    );
  };


  // Step 1: take picture or choose from album
  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    handleImagePicked(result);


  };

  const handleChooseFromAlbum = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    handleImagePicked(result);

  };

  // pickerResult is from either taking a photo or choosing from album
  const handleImagePicked = async (pickerResult) => {
    // Step 2 : if the action was not cancelled by the user, then upload it to Firebase Storage
    if (!pickerResult.canceled) {
      const uploadUri = await uploadImage(pickerResult.assets[0].uri);
      if (uploadUri) {
        // step 3: update user document with the new avatar url (from Firebase)
        updateUserAvatar(uploadUri);
      }
    }
  };





  return (
    <View style={styles.container}>
      <Avatar
        size={80}
        rounded
        source={userData.avatar ? { uri: userData.avatar } : DEFAULT_AVATAR}
        onPress={takeImageOrChooseFromAlbum}
        containerStyle={styles.avatar}
      >
        <Avatar.Accessory size={20} />
      </Avatar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
})