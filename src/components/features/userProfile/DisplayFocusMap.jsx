import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function DisplayFocusMap({ focusTasksLocations, mapRegion }) {
  return (
    <MapView
      provider='google'
      style={styles.mapStyle}
      region={mapRegion}
    >
      {focusTasksLocations.map(loc => (
        <Marker
          key={loc.key}
          coordinate={{
            latitude: loc.latitude,
            longitude: loc.longitude
          }}
        />
      ))}
    </MapView>

  )
}

const styles = StyleSheet.create({
  mapStyle: {
    width: '80%',
    height: '40%',
    borderRadius: 20,
    marginTop: 20,
  }
})