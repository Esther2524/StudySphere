import { View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Colors } from "../../utils/Colors";
import GroupCardList from "../features/studyGroup/GroupCardList";
import GroupInfoModal from "../features/studyGroup/GroupInfoModal";
import PressableButton from "../ui/PressableButton";
import AddIcon from "../ui/AddIcon";
import { GROUP_DETAIL_SCREEN_TITLE } from "../../utils/constants";

export default function StudyGroupScreen({ navigation }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton onPress={() => setShowModal(true)}>
            <AddIcon color={Colors.headerTitleColor} size={30} />
          </PressableButton>
        );
      },
    });
  }, []);

  const onCreateSuccess = useCallback(({ groupName, groupId }) => {
    setShowModal(false);
    navigation.navigate(GROUP_DETAIL_SCREEN_TITLE, {
      groupName,
      groupId,
    });
  }, []);

  return (
    <View style={styles.container}>
      {showModal && (
        <GroupInfoModal
          setShowModal={setShowModal}
          onMutateSuccess={onCreateSuccess}
          isCreating={true}
        />
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
