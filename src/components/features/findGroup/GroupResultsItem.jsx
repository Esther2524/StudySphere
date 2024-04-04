import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import GroupInfoBox from "../studyGroup/GroupInfoBox";
import PressableButton from "../../ui/PressableButton";
import { Colors } from "../../../utils/Colors";
import { AntDesign } from "@expo/vector-icons";
import useJoinGroup from "./useJoinGroup";
import GroupResultsItemSkeleton from "./GroupResultsItemSkeleton";

export default function GroupResultsItem({
  groupName,
  groupSize,
  groupId,
  joined,
  isLoading,
}) {
  const { mutate: joinGroupHandler, isPending: isJoining } = useJoinGroup();

  return (
    <View style={styles.container}>
      {isLoading && <GroupResultsItemSkeleton />}
      {!isLoading && (
        <>
          <Text style={styles.title}>{groupName}</Text>
          <View style={styles.subLine}>
            <GroupInfoBox groupSize={groupSize} />
            <PressableButton
              containerStyle={[
                styles.joinBtnContainer,
                { width: joined ? 110 : "auto", opacity: joined ? 0.5 : 1 },
              ]}
              onPress={() => {
                joinGroupHandler(groupId);
              }}
              disabled={joined || isJoining}
            >
              {isJoining && (
                <>
                  <Text style={styles.joinBtnText}>Joining...</Text>
                  <ActivityIndicator
                    style={{ marginLeft: 5 }}
                    size={20}
                    color={Colors.screenBgColor}
                  />
                </>
              )}
              {!isJoining && !joined && (
                <Text style={styles.joinBtnText}>Join</Text>
              )}
              {!isJoining && joined && (
                <>
                  <Text style={[styles.joinBtnText, { marginRight: 5 }]}>
                    Joined
                  </Text>
                  <AntDesign
                    name="checkcircleo"
                    size={20}
                    color={Colors.screenBgColor}
                  />
                </>
              )}
            </PressableButton>
          </View>
        </>
      )}
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
    flexDirection: "row",
    alignItems: "center",
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
