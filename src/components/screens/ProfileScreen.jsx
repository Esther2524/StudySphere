import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../utils/Colors';
import PressableButton from '../ui/PressableButton';
import ModalView from '../ui/ModalView';
import FormOperationBar from '../ui/FormOperationBar';
import InputWithLabel from '../ui/InputWithLabel';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../../api/FirestoreConfig';
import { getDoc, doc, updateDoc } from 'firebase/firestore';


const defaultAvatar = require('../../../assets/defaultAvatar.jpg');

export default function ProfileScreen() {

  const [userData, setUserData] = useState({
    userEmail: '',
    userName: '',
    avatar: '',
    status: '',
  });
  const [editModal, setEditModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          // console.log(userData);
        } else {
          console.log("No such document!");
        }
      }
    });

    return () => unsubscribe(); // cleanup subscription on unmount
  }, []);



  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }

  const handleEditUserName = async () => {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      userName: newUserName,
    });
    setUserData((prevData) => ({ ...prevData, userName: newUserName }));
    setEditModal(false);
  }


  return (
    <View style={styles.container}>

      <Image
        source={userData.avatar ? { uri: userData.avatar } : defaultAvatar}
        style={styles.avatar}
      />
      <View style={styles.nameContainer}>
        <Text style={styles.usernameText}>Username: {userData.userName}</Text>
        <PressableButton onPress={() => { setEditModal(true) }} containerStyle={styles.editButton}>
          <Text>Edit</Text>
        </PressableButton>
      </View>

      <Text style={styles.text}>Email: {userData.userEmail}</Text>

      <PressableButton onPress={handleSignOut} containerStyle={styles.logoutButton}>
        <Text style={styles.logoutButtonText}> Log Out</Text>
      </PressableButton>

      <ModalView isVisible={editModal}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Edit Username</Text>
          <InputWithLabel
            content={newUserName}
            setContent={setNewUserName}
            placeholder="Enter your new username"
            containerStyle={{ width: '100%', marginTop: 20 }}
          />
          <FormOperationBar
            confirmText="Save"
            cancelText="Cancel"
            confirmHandler={handleEditUserName}
            cancelHandler={() => { setEditModal(false) }}
          />
        </View>

      </ModalView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: Colors.profileText,
  },
  usernameText: {
    marginRight: 10,
    fontSize: 18,
    color: Colors.profileText,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: Colors.logOutButtonBg,
    borderRadius: 8,
    padding: 5,
    width: 40,
    height: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: Colors.modalTitle,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 50,
    backgroundColor: Colors.logOutButtonBg,
    borderRadius: 10,
    padding: 10,
    width: 120,
    height: 40,
  },
  logoutButtonText: {
    color: Colors.mainText,
    textAlign: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%',
  },
})