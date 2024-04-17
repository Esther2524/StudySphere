import { View, Text, StyleSheet, Image } from "react-native";
import React, { useCallback, useState } from "react";
import LinearProgress from "../../ui/LinearProgress";
import { Colors } from "../../../utils/Colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import PressableButton from "../../ui/PressableButton";

export default function GroupMemberItem({
  name,
  avatar,
  studyTime,
  likesCount,
  groupTarget,
  likeHandler,
}) {
  const [isLiked, setIsLiked] = useState(false);

  const defaultAvatar = require("../../../../assets/defaultAvatar.jpg");

  const progressValue = studyTime / groupTarget;

  const onLike = useCallback(() => {
    likeHandler();
    setIsLiked(true);
  }, [setIsLiked]);

  return (
    <View style={styles.container}>
      <View style={styles.lineOne}>
        <Image
          source={avatar ? { uri: avatar } : defaultAvatar}
          style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
        <PressableButton onPress={onLike}>
          {!isLiked && (
            <>
              <Text style={styles.likeCount}>{likesCount || 0}</Text>
              <AntDesign
                name="like2"
                size={24}
                style={styles.likeBtn}
                color={Colors.likeIconColor}
              />
            </>
          )}
          {isLiked && (
            <>
              <Text style={styles.likeCount}>{likesCount || 0}</Text>
              <AntDesign
                name="like1"
                size={24}
                style={styles.likeBtn}
                color={Colors.likeIconColor}
              />
            </>
          )}
        </PressableButton>
      </View>
      <View style={styles.lineTwo}>
        <View style={{ width: 200 }}>
          <LinearProgress
            value={progressValue}
            color={Colors.screenBgColor}
            height={15}
            width={250}
          />
        </View>
        <View style={styles.timeContainer}>
          <MaterialIcons name="access-time" size={18} color={Colors.mainText} />
          <Text>{studyTime}h</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: "auto",
  },
  lineOne: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 5,
  },
  lineTwo: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
  },
  avatar: {
    borderRadius: 1000,
    width: 40,
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    marginLeft: 57,
  },
  likeBtn: {
    marginBottom: 3,
  },
  likeCount: {
    position: "absolute",
    fontSize: 12,
    right: -8,
    top: -5,
    color: Colors.likeIconColor,
  },
});
