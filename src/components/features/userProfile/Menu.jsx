import { StyleSheet, Text, View, Modal, Platform } from 'react-native'
import React from 'react'
import PressableButton from '../../ui/PressableButton'

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
          >
            <Text>Edit Username</Text>
          </PressableButton>

          <PressableButton
            onPress={() => { handleSignOut(); setIsMenuVisible(false); }}
          >
            <Text>Log Out</Text>

          </PressableButton>
        </View>

      </PressableButton>

    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 85,
    right: 50,
    width: 160,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
});
