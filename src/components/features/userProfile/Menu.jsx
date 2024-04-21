import { StyleSheet, Text, View, Modal, Platform } from 'react-native';
import React from 'react';
import PressableButton from '../../ui/PressableButton';
import { Entypo, Feather } from "@expo/vector-icons";
import HeaderMenu from '../../ui/HeaderMenu';


export default function Menu({
  isMenuVisible, setIsMenuVisible, setEditModal, handleSignOut
}) {
  const menuOptions = [
    {
      icon: <Feather name='edit' size={22} />,
      label: 'Edit Username',
      onPress: () => {
        setEditModal(true);
        setIsMenuVisible(false);
      }
    },
    {
      icon: <Entypo name='log-out' size={22} />,
      label: 'Log Out',
      onPress: () => {
        handleSignOut();
        setIsMenuVisible(false);
      }
    }
  ];

  return (
    isMenuVisible &&
    <HeaderMenu
      menuOptions={menuOptions}
      toggleMenu={() => setIsMenuVisible(!isMenuVisible)}
    />
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // create a black color with 50% transparency
  },
  menuContainer: {
    position: 'absolute',
    top: 85,
    right: 50,
    width: 180,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  firstOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
  },
  secondOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  }
});
