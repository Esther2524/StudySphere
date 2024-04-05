import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { collection, query, onSnapshot } from "firebase/firestore";
import { Colors } from "../../utils/Colors";
import { db, auth } from "../../api/FirestoreConfig";
import FocusCard from "../features/focusList/FocusCard";
import AddFocus from "../features/focusList/AddFocus";
import { AntDesign, Octicons } from "@expo/vector-icons";
import PressableButton from "../ui/PressableButton";
import EditFocus from "../features/focusList/EditFocus";
import AddReminder from "../features/focusList/AddReminder";
import MapModal from "../features/focusList/MapModal";

export default function FocusScreen() {
  const [focusTasks, setFocusTasks] = useState([]);
  const [isAddFocusVisible, setIsAddFocusVisible] = useState(false);
  const [isReminderVisible, setIsReminderVisible] = useState(false);

  // for EditFocus Modal to keep track of which focus task is selected for editing or deletion
  const [selectedFocusID, setSelectedFocusID] = useState(null);
  const [isEditFocusVisible, setIsEditFocusVisible] = useState(false);
  const [focusTitle, setFocusTitle] = useState("");
  const [focusDuration, setFocusDurarion] = useState("");
  const [focusLocation, setFocusLocation] = useState(null);
  const [isFromEdit, setIsFromEdit] = useState(false);

  // for Map Modal
  const [isMapVisible, setIsMapVisible] = useState(false);
  // closingForMap is used to track whether the modal is being closed to navigate to the Map modal 
  // or if it's being closed after adding a task or cancelling the operation
  const [closingForMap, setClosingForMap] = useState(false);


  // AddFocus Modal and Map Modal will share this currentLocation state variable
  const [currentLocation, setCurrentLocation] = useState(null);

  // use navigation dynamically set the navigation options, including adding a button to the screen's header
  const navigation = useNavigation();

  // reset location whenever AddFocus is to be shown
  const showAddFocusModal = () => {
    setCurrentLocation(null); 
    setIsAddFocusVisible(true);
  };

  // use useLayoutEffect to set the navigation options and include the button in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.buttonContainer}>
          <PressableButton
            onPress={() => setIsReminderVisible(true)}
            containerStyle={{ marginRight: 15 }}
          >
            <Octicons name="bell" size={24} color={Colors.addFocusButton} />
          </PressableButton>

          <PressableButton
            onPress={showAddFocusModal}
            containerStyle={{ marginRight: 20 }}
          >
            <AntDesign
              name="pluscircleo"
              size={24}
              color={Colors.addFocusButton}
            />
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
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const tasks = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFocusTasks(tasks);
        },
        (error) => {
          console.log("Error fetching focus tasks:", error);
        }
      );

      // cleanup function to unsubscribe from the listener when the component unmounts
      return () => unsubscribe();
    }
  }, []);



  const onStartPress = (focusID, duration) => {
    navigation.navigate(STANDBY_SCREEN_NAME, { focusID, duration });
  };






  return (
    <View style={styles.container}>
      <FlatList
        data={focusTasks}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(item) => item.id}
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
              setFocusLocation(item.location);
              setSelectedFocusID(item.id);
            }}
          />
        )}
      />
      <AddFocus
        isAddFocusVisible={isAddFocusVisible}
        setIsAddFocusVisible={setIsAddFocusVisible}
        setIsMapVisible={setIsMapVisible}
        closingForMap={closingForMap}
        setClosingForMap={setClosingForMap}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
      <EditFocus
        isEditFocusVisible={isEditFocusVisible}
        setIsEditFocusVisible={setIsEditFocusVisible}
        setIsFromEdit={setIsFromEdit}
        focusTitle={focusTitle}
        focusDuration={focusDuration}
        focusLocation={focusLocation}
        focusID={selectedFocusID}
        setFocusLocation={setFocusLocation}
        setIsMapVisible={setIsMapVisible}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
      <MapModal
        isMapVisible={isMapVisible}
        setIsMapVisible={setIsMapVisible}
        setIsAddFocusVisible={setIsAddFocusVisible}
        setIsEditFocusVisible={setIsEditFocusVisible}
        isFromEdit={isFromEdit}
        setIsFromEdit={setIsFromEdit}
        setClosingForMap={setClosingForMap}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />

      <AddReminder
        isReminderVisible={isReminderVisible}
        setIsReminderVisible={setIsReminderVisible}
      />
    </View>
  );
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
    flexDirection: "row",
    alignItems: "center",
  },
});
