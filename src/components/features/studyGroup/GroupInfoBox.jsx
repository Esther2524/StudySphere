import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../../utils/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function GroupInfoBox({ numOfPeople }) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="group" size={20} color={Colors.mainText} />
      <Text>{numOfPeople}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
});
