import { Text, StyleSheet, StatusBar, View } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import { Overlay } from "@rneui/themed";
import { useHeaderHeight } from "@react-navigation/elements";

function MenuItem({ icon, label, onPress }) {
  return (
    <PressableButton
      containerStyle={styles.menuItemContainer}
      onPress={onPress}
    >
      <View style={styles.menuIcon}>{icon}</View>
      <Text style={styles.menuLabel}>{label}</Text>
    </PressableButton>
  );
}

// The menuOptions is a list of {icon, label, onPress}
export default function HeaderMenu({ menuOptions, toggleMenu }) {
  const headerHeight = useHeaderHeight();
  return (
    <Overlay
      backdropStyle={styles.menuBackdrop}
      fullScreen={false}
      overlayStyle={[
        styles.menuContainer,
        {
          top: headerHeight - Number(StatusBar.currentHeight),
        },
      ]}
      onBackdropPress={toggleMenu}
    >
      {menuOptions.map((item, ind) => (
        <MenuItem {...item} key={ind} />
      ))}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  menuBackdrop: { backgroundColor: "transparent" },
  menuContainer: {
    width: 180,
    height: "auto",
    justifyContent: "space-evenly",
    top: 100,
    right: 10,
    borderRadius: 10,
    position: "absolute",
    shadowColor: "black",
    shadowRadius: 30,
    shadowOffset: { width: -20, height: 10 },
    shadowOpacity: 0.2,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    height: 50,
  },
  menuIcon: { marginHorizontal: 10 },
  menuLabel: { fontSize: 16 },
});
