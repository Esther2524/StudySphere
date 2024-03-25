import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Colors } from '../../utils/Colors';
import { db, auth } from '../../api/FirestoreConfig';
import FocusCard from '../features/focusList/FocusCard';
import AddFocus from '../features/focusList/AddFocus';
import { AntDesign } from '@expo/vector-icons';
import PressableButton from '../ui/PressableButton';


export default function FocusScreen() {

  const [focusTasks, setFocusTasks] = useState([]);
  const [isAddFocusVisible, setIsAddFocusVisible] = useState(false);

  // use navigation dynamically set the navigation options, including adding a button to the screen's header
  const navigation = useNavigation();


  // use useLayoutEffect to set the navigation options and include the button in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton onPress={() => setIsAddFocusVisible(true)} containerStyle={{ marginRight: 25 }}>
          <AntDesign name="pluscircleo" size={24} color={Colors.addFocusButton} />
        </PressableButton>
      ),
    });
  }, [navigation]);


  useEffect(() => {
    const fetchFocusTasks = async () => {
      // get the current user info using `auth`
      const user = auth.currentUser;
      if (user) {
        try {
          const q = query(collection(db, "users", user.uid, "focus"));
          const querySnapshot = await getDocs(q);
          const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setFocusTasks(tasks);
        } catch (error) {
          console.log("Error fetching focus tasks:", error);
        }
      } else {
        console.log("No user is currently signed in.");
      }
    };

    fetchFocusTasks();
  }, []);



  return (
    <View style={styles.container}>
      <FlatList
        data={focusTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FocusCard title={item.title} duration={item.duration} />
        )}
      />
      <AddFocus
        isAddFocusVisible={isAddFocusVisible}
        setIsAddFocusVisible={setIsAddFocusVisible}
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
})