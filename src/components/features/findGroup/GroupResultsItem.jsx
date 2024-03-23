import { View, Text, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import GroupInfoBox from "../studyGroup/GroupInfoBox";
import PressableButton from "../../ui/PressableButton";
import { Colors } from "../../../utils/Colors";

export default function GroupResultsItem({ groupName, numOfPeople, groupId }) {
  const joinHandler = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{groupName}</Text>
      <View style={styles.subLine}>
        <GroupInfoBox numOfPeople={numOfPeople} />
        <PressableButton
          containerStyle={styles.joinBtnContainer}
          onPress={joinHandler}
        >
          <Text style={styles.joinBtnText}>Join</Text>
        </PressableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 25,
    backgroundColor: Colors.cardBgColor,
    width: 320,
    marginHorizontal: "auto",
    borderRadius: 20,
  },
  title: {
    color: Colors.mainText,
    fontSize: 18,
    width: 250,
    marginRight: 5,
  },
  subLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
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
