import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Colors } from '../../utils/Colors';
import { db, auth } from '../../api/FirestoreConfig';
import FocusCard from '../features/focusList/FocusCard';
import AddFocus from '../features/focusList/AddFocus';
import { AntDesign } from '@expo/vector-icons';
import PressableButton from '../ui/PressableButton';
import EditFocus from '../features/focusList/EditFocus';
import AddReminder from '../features/focusList/AddReminder';


export default function FocusScreen() {

  const [focusTasks, setFocusTasks] = useState([]);
  const [isAddFocusVisible, setIsAddFocusVisible] = useState(false);
  const [isReminderVisible, setIsReminderVisible] = useState(false);

  // for EditFocus Modal to keep track of which focus task is selected for editing or deletion
  const [selectedFocusID, setSelectedFocusID] = useState(null);
  const [isEditFocusVisible, setIsEditFocusVisible] = useState(false);
  const [focusTitle, setFocusTitle] = useState("");
  const [focusDuration, setFocusDurarion] = useState("");


  // use navigation dynamically set the navigation options, including adding a button to the screen's header
  const navigation = useNavigation();


  // use useLayoutEffect to set the navigation options and include the button in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.buttonContainer}>
          <PressableButton
            onPress={() => setIsReminderVisible(true)}
            containerStyle={{ marginRight: 15 }}
          >
            <AntDesign name="calendar" size={24} color={Colors.addFocusButton} />
          </PressableButton>

          <PressableButton
            onPress={() => setIsAddFocusVisible(true)}
            containerStyle={{ marginRight: 20 }}
          >
            <AntDesign name="pluscircleo" size={24} color={Colors.addFocusButton} />
          </PressableButton>

        </View>

      ),
    });
  }, [navigation]);


  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, "users", user.uid, "focus"));

      // set up the real-time listener with onSnapshot
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFocusTasks(tasks);
      }, (error) => {
        console.log("Error fetching focus tasks:", error);
      });

      // cleanup function to unsubscribe from the listener when the component unmounts
      return () => unsubscribe();
    }
  }, []);

  const onStartPress = (focusID, duration) => {
    navigation.navigate('Standby', { focusID, duration });
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={focusTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FocusCard
            title={item.title}
            duration={item.duration}
            todayTimes={item.todayTimes}
            onStartPress={() => onStartPress(item.id, item.duration)} // Pass the duration to onStartPress
            onEditPress={() => {
              setIsEditFocusVisible(true);
               // pass the focus data to the EditFocus Modal
              setFocusTitle(item.title);
              setFocusDurarion(item.duration);
              setSelectedFocusID(item.id);
            }}
          />
        )}
      />
      <AddFocus
        isAddFocusVisible={isAddFocusVisible}
        setIsAddFocusVisible={setIsAddFocusVisible}
      />
      <EditFocus
        isEditFocusVisible={isEditFocusVisible}
        setIsEditFocusVisible={setIsEditFocusVisible}
        focusTitle={focusTitle}
        focusDuration={focusDuration}
        focusID={selectedFocusID}
      />

      <AddReminder
        isReminderVisible={isReminderVisible}
        setIsReminderVisible={setIsReminderVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
  },
  focusLabel: {
    color: Colors.focusText,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})