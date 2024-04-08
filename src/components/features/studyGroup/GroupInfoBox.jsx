import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../../utils/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function SingleInfo({ icon, content }) {
  return (
    <View style={styles.singleItem}>
      {icon}
      {<Text style={styles.text}>{content}</Text>}
    </View>
  );
}

export default function GroupInfoBox({ groupSize, groupTarget }) {
  return (
    <View style={styles.container}>
      <SingleInfo
        icon={<MaterialIcons name="group" size={20} color={Colors.mainText} />}
        content={groupSize}
      />
      <SingleInfo
        icon={
          <MaterialCommunityIcons
            name="bullseye-arrow"
            size={20}
            color={Colors.mainText}
          />
        }
        content={groupTarget}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  singleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  text: {
    fontSize: 16,
  },
});
