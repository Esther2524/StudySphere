import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import * as ImagePicker from "expo-image-picker";
import { Alert } from 'react-native';
import { auth, db } from '../../../api/FirestoreConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from "@expo/vector-icons";
import PressableButton from '../../ui/PressableButton';
import { Colors } from '../../../utils/Colors';

export default function ImageManager({ imageUri, setImageUri }) {

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


  const updateFocusBgImage = async (downloadUrl) => {
    const focusRef = doc(db, "users", auth.currentUser.uid, "focus", focusID);
    await updateDoc(focusRef, {
      imageUri: downloadUrl,
    });
  };

  const takeImageOrChooseFromAlbum = async () => {
    const havePermission = await verifyPermission();
    if (!havePermission) {
      Alert.alert("You need to give permission");
      return null;
    }
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
      aspect: [3, 2],
    });
    handleImagePicked(result);
  };

  const handleImagePicked = async (pickerResult) => {
    if (!pickerResult.canceled) {
      // this uri is the local uri
      setImageUri(pickerResult.assets[0].uri);
    }
    return null;
  };

  const clearImageSelection = () => {
    setImageUri("");
  }

  return (
    <View style={styles.imageArea}>
      <PressableButton
        onPress={takeImageOrChooseFromAlbum}
        containerStyle={styles.buttonContainer}
      >
        <Text style={styles.buttonTitle}>Select Background Picture</Text>
        {imageUri ?
          <>
            <AntDesign name='check' size={20} color={Colors.addFocusButton} />
            <PressableButton onPress={clearImageSelection}>
              <AntDesign name="closecircleo" size={20} color={Colors.addFocusButton} />
            </PressableButton>
          </>
          : <AntDesign name="arrowright" size={20} color={Colors.addFocusButton} />
        }

      </PressableButton>
    </View>
  )
}

const styles = StyleSheet.create({
  imageArea: {
    marginBottom: 20,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.timerText,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },

})