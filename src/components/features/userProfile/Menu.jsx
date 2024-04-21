import React from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import HeaderMenu from "../../ui/HeaderMenu";

export default function Menu({
  isMenuVisible,
  setIsMenuVisible,
  setEditModal,
  handleSignOut,
}) {
  const menuOptions = [
    {
      icon: <Feather name="edit" size={22} />,
      label: "Edit Username",
      onPress: () => {
        setEditModal(true);
        setIsMenuVisible(false);
      },
    },
    {
      icon: <Entypo name="log-out" size={22} />,
      label: "Log Out",
      onPress: () => {
        handleSignOut();
        setIsMenuVisible(false);
      },
    },
  ];

  return (
    isMenuVisible && (
      <HeaderMenu
        menuOptions={menuOptions}
        toggleMenu={() => setIsMenuVisible(!isMenuVisible)}
      />
    )
  );
}
