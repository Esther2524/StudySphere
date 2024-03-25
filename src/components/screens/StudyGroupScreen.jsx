import { View, Text, StyleSheet, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../utils/Colors";
import GroupCardList from "../features/studyGroup/GroupCardList";
import AddGroupModal from "../features/studyGroup/AddGroupModal";
import PressableButton from "../ui/PressableButton";
import AddIcon from "../ui/AddIcon";

export default function StudyGroupScreen({ navigation }) {
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton onPress={() => setShowAddGroupModal(true)}>
            <AddIcon color={Colors.headerTitleColor} size={30} />
          </PressableButton>
        );
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      {showAddGroupModal && (
        <AddGroupModal setShowAddGroupModal={setShowAddGroupModal} />
      )}
      <GroupCardList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
  },
  innerContainer: {
    backgroundColor: Colors.groupBgColor,
  },
});
