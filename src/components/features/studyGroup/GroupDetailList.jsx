import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Colors } from "../../../utils/Colors";
import GroupDetailItem from "./GroupDetailItem";

export default function GroupDetailList() {
  const tempData = [
    {
      name: "Harry",
      avatar: "https://i.pravatar.cc/48?u=118836",
      studyTime: 3,
    },
    { name: "Amy", avatar: "https://i.pravatar.cc/48?u=933372", studyTime: 5 },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={tempData}
        renderItem={({ item: { name, avatar, studyTime } }) => (
          <GroupDetailItem avatar={avatar} name={name} studyTime={studyTime} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBgColor,
    justifyContent: "center",
    width: 360,
    borderRadius: 15,
    marginTop: 30,
    paddingLeft: 20,
    paddingVertical: 20,
  },
});
