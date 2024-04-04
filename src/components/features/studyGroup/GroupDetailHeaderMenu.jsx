import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../../utils/Colors";
import { AntDesign } from "@expo/vector-icons";
import { getUserRef } from "../../../utils/helper";
import useQuitGroup from "./useQuitGroup";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "../../ui/PressableButton";
import HeaderMenu from "../../ui/HeaderMenu";

function QuitIcon() {
  return (
    <AntDesign
      name="closecircleo"
      size={24}
      color="black"
      style={styles.menuIcon}
    />
  );
}

export default function GroupDetailHeaderMenu({ groupId, groupOwnerId }) {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const userRef = getUserRef();
  const curUserId = userRef.id;
  const isOwner = curUserId === groupOwnerId;
  const { mutate: quitGroup, isPending: isQuitting } = useQuitGroup(isOwner);

  const quitHandler = () => {
    quitGroup(groupId);
    navigation.goBack();
  };

  const quitAlertMsg = isOwner
    ? "You are the owner of the group. Once quit, the group will be deleted. Are you sure to quit?"
    : "Are you sure to quit?";

  const onQuit = () => {
    Alert.alert("Confirm", quitAlertMsg, [
      { text: "Cancel", style: "cancel" },
      { text: "Quit", style: "destructive", onPress: quitHandler },
    ]);
  };

  const toggleMenu = () => {
    setShowMenu((show) => !show);
  };

  const menuOptions = [
    { label: "Quit Group", onPress: onQuit, icon: QuitIcon() },
  ];

  return (
    <>
      <PressableButton onPress={toggleMenu}>
        <Entypo
          name="dots-three-horizontal"
          size={24}
          color={Colors.headerTitleColor}
        />
      </PressableButton>
      {showMenu && (
        <HeaderMenu menuOptions={menuOptions} toggleMenu={toggleMenu} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuBackdrop: {
    backgroundColor: "transparent",
  },
  menu: {
    width: 180,
    height: 60,
    justifyContent: "center",
    top: 100,
    right: 10,
    borderRadius: 10,
    position: "absolute",
    shadowColor: "black",
    shadowRadius: 30,
    shadowOffset: { width: -20, height: 10 },
    shadowOpacity: 0.2,
  },
  menuIcon: {
    marginHorizontal: 10,
  },
  menuText: { fontSize: 16 },

  menuLine: {
    flexDirection: "row",
    alignItems: "center",
  },
});
