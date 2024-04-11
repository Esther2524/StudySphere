import { StyleSheet, Text, View, Modal, Platform } from 'react-native';
import React from 'react';
import PressableButton from '../../ui/PressableButton';
import { Entypo, Feather } from "@expo/vector-icons";


export default function Menu({
  isMenuVisible, setIsMenuVisible, setEditModal, handleSignOut
}) {
  return (
    <Modal
      visible={isMenuVisible}
      transparent={true}
    >
      <PressableButton
        onPress={() => setIsMenuVisible(false)} // close menu when clicking outside
        containerStyle={styles.modalOverlay}
      >
        <View style={styles.menuContainer}>
          <PressableButton
            onPress={() => { setEditModal(true); setIsMenuVisible(false); }}
            containerStyle={styles.firstOption}
          >
            <Feather name='edit' size={22} />
            <Text style={styles.optionText}>Edit Username</Text>
          </PressableButton>

          <PressableButton
            onPress={() => { handleSignOut(); setIsMenuVisible(false); }}
            containerStyle={styles.secondOption}
          >
            <Entypo name='log-out' size={22} />
            <Text style={styles.optionText}>Log Out</Text>
          </PressableButton>
        </View>

      </PressableButton>

    </Modal>
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
