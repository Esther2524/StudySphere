import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../utils/Colors';
import PressableButton from '../ui/PressableButton';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../../api/FirestoreConfig';
import { getDoc, doc, updateDoc, query, collection, getDocs, onSnapshot } from 'firebase/firestore';
import EditNameModal from '../features/userProfile/EditNameModal';
import MapView, { Marker } from 'react-native-maps';
import locateFocusHandler from '../features/focusList/LocationHelper';


const defaultAvatar = require('../../../assets/defaultAvatar.jpg');
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

      <MapView
        provider='google'
        style={styles.mapStyle}
        region={mapRegion}
      >
        {focusTasksLocations.map(loc => (
          <Marker
            key={loc.key}
            coordinate={{
              latitude: loc.latitude,
              longitude: loc.longitude
            }}
          />
        ))}
      </MapView>

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
  image: {
    width: '80%', // Adjust as necessary
    height: 400,
    borderRadius: 20,
  },
  mapStyle: {
    width: 400,
    height: 400,
  }
})