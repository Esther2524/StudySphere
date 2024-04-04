import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ModalView from '../../ui/ModalView';
import PressableButton from '../../ui/PressableButton';

export default function MapModal({
  isMapVisible, setIsMapVisible, setIsAddFocusVisible, setClosingForMap
}) {

  const closeMapModal = () => {
    setIsMapVisible(false);
    setIsAddFocusVisible(true);
    
    // make sure next time AddFocus modal is closed (for reasons other than navigating to the MapModal), 
    // the input fields will be cleared as intended
    setClosingForMap(false); 
  };


  return (
    <ModalView isVisible={isMapVisible}>
      <View style={styles.modalView}>
        <PressableButton onPress={closeMapModal}>
          <Text>Go Back</Text>
        </PressableButton>

      </View>
    </ModalView>
  )
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 20,
    width: '90%',
  },
})