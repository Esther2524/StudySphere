import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import LinearProgress from "../../ui/LinearProgress";
import { Colors } from "../../../utils/Colors";

export default function GroupDetailItem({ name, avatar, studyTime }) {
  return (
    <View style={styles.container}>
      <View style={styles.lineOne}>
        <Image
          source={{ uri: avatar }}
          width={40}
          height={40}
          style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      <LinearProgress
        value={0.8}
        color={Colors.screenBgColor}
        height={25}
        width={300}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  lineOne: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
  },
  avatar: {
    borderRadius: 1000,
  },
});
