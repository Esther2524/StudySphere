import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Colors } from '../../utils/Colors';
import PressableButton from '../ui/PressableButton';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../api/FirestoreConfig';
import { getDoc, doc, updateDoc, query, collection, onSnapshot } from 'firebase/firestore';
import EditNameModal from '../features/userProfile/EditNameModal';
import locateFocusHandler from '../features/focusList/LocationHelper';
import DisplayFocusMap from '../features/userProfile/DisplayFocusMap';
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Menu from '../features/userProfile/Menu';
import AvatarManager from '../features/userProfile/AvatarManager';



const DEFAULT_CENTER = {
  latitude: 49.22199308411145,
  longitude: -122.95789036911256,
}

export default function ProfileScreen() {

  const [userData, setUserData] = useState({
    userEmail: '',
    userName: '',
    avatar: '',
    status: '',
  });
  const [editModal, setEditModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  // for display locations
  const [focusTasksLocations, setFocusTasksLocations] = useState([]);
  const [currLocation, setCurrLocation] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: DEFAULT_CENTER.latitude,
    longitude: DEFAULT_CENTER.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isMapShown, setIsMapShown] = useState(false);

  // for menu
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // for avatar
  const [imageUri, setImageUri] = useState("");

  // use useLayoutEffect to set the navigation options and include the button in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.buttonContainer}>
          <PressableButton
            onPress={() => setIsMenuVisible(true)}
            containerStyle={{ marginRight: 25 }}
          >
            <AntDesign name="setting" size={25} color={Colors.addFocusButton} />
          </PressableButton>
        </View>
      ),
    });
  }, [navigation]);


  // ensure the user's profile data is always current
  useEffect(() => {
    // ensure there's a logged-in user
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      // set up real-time updates for the user's document
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setUserData(doc.data()); // update with the latest user data
        } else {
          console.log("No such document!");
        }
      });

      return () => unsubscribe(); // cleanup on unmount
    }
  }, []);




  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const tasksQuery = query(collection(db, "users", user.uid, "focus"));
      // use onSnapshot here to listen for realtime updates from Firestore for the focus tasks
      // then any change in the focus tasks collection for the user triggers an automatic update in this component
      // if I edit/add a focus, the map should be updated right away
      const unsubscribe = onSnapshot(tasksQuery, (querySnapshot) => {
        const tasksLocations = querySnapshot.docs
          .filter(doc => doc.data().location)
          .map(doc => ({
            ...doc.data().location,
            key: doc.id,
          }));
        setFocusTasksLocations(tasksLocations);

        const fetchLocation = async () => {
          const location = await locateFocusHandler();
          setCurrLocation(location);
        };
        fetchLocation().catch(console.error);

      });

      return () => unsubscribe();
    }
  }, []);


  // update mapRegion (passed to MapView to be the center) 
  // only when currLocation changes (when database changes and then fetching the device's current location)
  useEffect(() => {
    if (currLocation) {
      setMapRegion({
        ...mapRegion,
        latitude: currLocation.latitude,
        longitude: currLocation.longitude,
      });
    }
  }, [currLocation]);


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
      <AvatarManager
        userData={userData}
      />

      <Text style={styles.usernameText}>Username: {userData.userName}</Text>
      <Text style={styles.text}>Email: {userData.userEmail}</Text>

      <Menu
        isMenuVisible={isMenuVisible}
        setIsMenuVisible={setIsMenuVisible}
        setEditModal={setEditModal}
        handleSignOut={handleSignOut}
      />

      <DisplayFocusMap
        focusTasksLocations={focusTasksLocations}
        mapRegion={mapRegion}
        isMapShown={isMapShown}
        setIsMapShown={setIsMapShown}
      />



      <EditNameModal
        editModal={editModal}
        setEditModal={setEditModal}
        newUserName={newUserName}
        setNewUserName={setNewUserName}
        handleEditUserName={handleEditUserName}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    color: Colors.profileText,
  },
  usernameText: {
    marginRight: 10,
    fontSize: 18,
    color: Colors.profileText,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: Colors.modalTitle,
    textAlign: 'center',
  },

})