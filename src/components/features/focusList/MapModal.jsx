import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ModalView from '../../ui/ModalView';
import FormOperationBar from '../../ui/FormOperationBar';
import MapView, { Marker } from 'react-native-maps';

export default function MapModal({
  isMapVisible, setIsMapVisible, setIsAddFocusVisible, setClosingForMap,
  currentLocation, setCurrentLocation
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
        {currentLocation &&
          <MapView
            provider='google'
            style={styles.mapStyle}
            initialRegion={{
              ...currentLocation,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            zoomEnabled={true}
            scrollEnabled={true}
            // user's moving the marker is based on the onPress event of the MapView
            onPress={(e) => {
              setCurrentLocation({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              })
            }}
          >
            <Marker
              coordinate={currentLocation}
            />
          </MapView>
        }


        <FormOperationBar
          confirmText="Confirm"
          cancelText="Cancel"
          confirmHandler={closeMapModal}
          cancelHandler={closeMapModal}
        />

      </View>
    </ModalView>
  )
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '90%',
  },
  mapStyle: {
    width: '100%',
    height: 500,
    marginBottom: 20,
  },

})