import { mapsApiKey } from "@env";
import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import PressableButton from "../../ui/PressableButton";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../../utils/Colors";

export default function DisplayLocation({
  currentLocation,
  openMapModal,
  clearLocation,
}) {
  return (
    <View style={styles.locationArea}>
      <PressableButton
        onPress={openMapModal}
        containerStyle={styles.buttonContainer}
      >
        <Text style={styles.buttonTitle}>Select Location</Text>
        {!currentLocation && (
          <AntDesign
            name="arrowright"
            size={20}
            color={Colors.addFocusButton}
          />
        )}
        {currentLocation && (
          <View style={styles.iconContainer}>
            <AntDesign name="check" size={20} color={Colors.addFocusButton} />
            <PressableButton onPress={clearLocation}>
              <AntDesign
                name="closecircleo"
                size={20}
                color={Colors.addFocusButton}
              />
            </PressableButton>
          </View>
        )}
      </PressableButton>
      {currentLocation && (
        <Image
          style={styles.image}
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${currentLocation.latitude},${currentLocation.longitude}&zoom=16&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${currentLocation.latitude},${currentLocation.longitude}&key=${mapsApiKey}`,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  locationArea: {
    marginBottom: 20,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: Colors.timerText,
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    height: 100,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  iconContainer: {
    flexDirection: "row",
    width: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
