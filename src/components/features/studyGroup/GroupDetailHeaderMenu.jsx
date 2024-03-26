import { Alert, StyleSheet } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../../utils/Colors";
import { Button, Menu, MenuItem, MenuItemLabel } from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";
import { getUserRef } from "../../../utils/helper";
import useQuitGroup from "./useQuitGroup";
import { useNavigation } from "@react-navigation/native";

export default function GroupDetailHeaderMenu({ groupId, groupOwnerId }) {
  const navigation = useNavigation();
  const userRef = getUserRef();
  const curUserId = userRef.id;
  const isOwner = curUserId === groupOwnerId;
  const { mutate: quitGroup, isPending: isQuitting } = useQuitGroup(isOwner);

  const quitHandler = () => {
    quitGroup(groupId);
    navigation.goBack();
  };

  const quitOption = "Quit Group";

  const alertMsg = isOwner
    ? "You are the owner of the group. Once quit, the group will be deleted. Are you sure to quit?"
    : "Are you sure to quit?";

  const triggerAlert = () => {
    Alert.alert("Confirm", alertMsg, [
      { text: "Cancel", style: "cancel" },
      { text: "Quit", style: "destructive", onPress: quitHandler },
    ]);
  };

  return (
    <Menu
      placement="bottom right"
      trigger={({ ...triggerProps }) => (
        <Button {...triggerProps} style={{ backgroundColor: "transparent" }}>
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color={Colors.headerTitleColor}
          />
        </Button>
      )}
      style={styles.menu}
      offset={5}
    >
      <MenuItem
        key={quitOption}
        textValue={quitOption}
        style={styles.menuItemContainer}
        onPress={triggerAlert}
      >
        <AntDesign
          name="closecircleo"
          size={24}
          color="black"
          style={styles.closeIcon}
        />
        <MenuItemLabel>{quitOption}</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
}

const styles = StyleSheet.create({
  menu: {
    minWidth: 180,
    shadowColor: "black",
    shadowRadius: 30,
    shadowOffset: { width: -20, height: 10 },
    shadowOpacity: 0.2,
  },
  menuItemContainer: {
    width: 180,
  },
  closeIcon: {
    marginHorizontal: 10,
  },
});
