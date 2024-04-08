import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../utils/Colors";
import GroupMemberList from "../features/studyGroup/GroupMemberList";
import useGetGroupDetail from "../features/studyGroup/useGetGroupDetail";
import GroupInfoModal from "../features/studyGroup/GroupInfoModal";
import GroupDetailHeaderMenu from "../features/studyGroup/GroupDetailHeaderMenu";
import { limitStrLen } from "../../utils/helper";

export default function GroupDetailsScreen({ route, navigation }) {
  const { groupId, groupOwnerId, groupName } = route.params;
  const { data: groupData, isLoading: isLoadingGroupData } =
    useGetGroupDetail(groupId);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: limitStrLen(groupName, 25),
      headerBackTitle: "Back",
      headerTintColor: Colors.headerTitleColor,
      headerRight: () => (
        <GroupDetailHeaderMenu
          groupId={groupId}
          groupOwnerId={groupOwnerId}
          setShowModal={setShowModal}
        />
      ),
    });
  }, []);

  const onEditSuccess = (newName) => {
    navigation.setOptions({
      title: newName,
    });
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {showModal && (
        <GroupInfoModal
          groupId={groupId}
          isCreating={false}
          onMutateSuccess={onEditSuccess}
          preName={groupData?.groupName}
          preTarget={groupData?.groupTarget}
          setShowModal={setShowModal}
        />
      )}

      <GroupMemberList groupId={groupId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
    alignItems: "center",
  },
});
