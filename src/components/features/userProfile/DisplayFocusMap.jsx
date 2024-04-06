import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '../../../utils/Colors';
import PressableButton from '../../ui/PressableButton';

export default function DisplayFocusMap({
  focusTasksLocations, mapRegion, isMapShown, setIsMapShown
}) {
  // console.log(focusTasksLocations);
  return (
    <View style={styles.container}>
      <PressableButton
        onPress={() => setIsMapShown(!isMapShown)}
        containerStyle={styles.showMapButton}>
        <Text style={styles.showMapButtonText}>{isMapShown ? "Hide All Focus" : "Show All Focus"}</Text>
      </PressableButton>

      {isMapShown
        && <MapView
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
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 450,
    width: 400,
    alignItems: 'center',
  },
  mapStyle: {
    width: '85%',
    height: '70%',
    borderRadius: 20,
    marginTop: 20,
  },
  showMapButton: {
    marginTop: 30,
    backgroundColor: Colors.showMapButtonBg,
    borderRadius: 10,
    padding: 10,
    width: 150,
    height: 40,
    alignItems: 'center',
  },
  showMapButtonText: {
    fontSize: 16,
  },
})