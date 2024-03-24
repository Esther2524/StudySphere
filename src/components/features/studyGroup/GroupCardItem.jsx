import { View, Text, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import PressableButton from "../../ui/PressableButton";
import { Colors } from "../../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import GroupInfoBox from "./GroupInfoBox";

export default function GroupCardItem({ title, numOfPeople, groupId }) {
  const navigation = useNavigation();
  const handlePress = useCallback(() => {
    navigation.navigate("Group Detail", { groupName: title, groupId });
  }, [title, groupId, navigation]);

  return (
    <PressableButton onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <GroupInfoBox numOfPeople={numOfPeople} />
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
