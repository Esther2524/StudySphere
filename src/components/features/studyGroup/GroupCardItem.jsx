import { View, Text, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import PressableButton from "../../ui/PressableButton";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function GroupCardItem({ title, numOfPeople }) {
  const navigation = useNavigation();
  const handlePress = useCallback(() => {
    navigation.navigate("Group Detail", { groupName: title });
  }, [title, navigation]);

  return (
    <PressableButton onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.subLine}>
          <View style={styles.infoContainer}>
            <MaterialIcons name="group" size={20} color="black" />
            <Text>{numOfPeople}</Text>
          </View>
          <PressableButton containerStyle={styles.joinBtnContainer}>
            <Text style={styles.joinBtnText}>Join</Text>
          </PressableButton>
        </View>
      </View>
    </PressableButton>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 30,
    backgroundColor: Colors.cardBgColor,
    width: 360,
    marginHorizontal: "auto",
    borderRadius: 20,
  },
  subLine: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    color: Colors.mainText,
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    gap: 3,
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
