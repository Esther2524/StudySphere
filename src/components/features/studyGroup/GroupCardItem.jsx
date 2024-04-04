import { View, Text, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import PressableButton from "../../ui/PressableButton";
import { Colors } from "../../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import GroupInfoBox from "./GroupInfoBox";
import GroupCardItemSkeleton from "./GroupCardItemSkeleton";
import { GROUP_DETAIL_SCREEN_TITLE } from "../../../utils/constants";

export default function GroupCardItem({
  groupName,
  groupSize,
  groupId,
  groupOwnerId,
  isLoading,
}) {
  const navigation = useNavigation();
  const handlePress = useCallback(() => {
    navigation.navigate(GROUP_DETAIL_SCREEN_TITLE, {
      groupName,
      groupId,
      groupOwnerId,
    });
  }, [groupName, groupId, navigation]);

  return (
    <PressableButton onPress={handlePress} disabled={isLoading}>
      <View style={styles.container}>
        {isLoading && <GroupCardItemSkeleton />}
        {!isLoading && (
          <>
            <Text style={styles.title}>{groupName}</Text>
            <GroupInfoBox groupSize={groupSize} />
          </>
        )}
      </View>
    </PressableButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: Colors.cardBgColor,
    width: 320,
    marginHorizontal: "auto",
    borderRadius: 10,
  },
  title: {
    color: Colors.mainText,
    fontSize: 18,
    width: 230,
    marginRight: 5,
  },
  joinBtnContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.colorYellow,
    borderRadius: 1000,
  },
  joinBtnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
