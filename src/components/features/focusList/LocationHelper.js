import * as Location from "expo-location";


async function verifyPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Foreground location permission not granted');
    return false;
  }
  return true;
}


// get the current geographical position (latitude and longitude) of the device.
export default async function locateFocusHandler() {
  try {
    const havePermission = await verifyPermission();
    if (!havePermission) {
      Alert("You need to give permission!");
      return;
    }
    const receivedLocation = await Location.getCurrentPositionAsync();
    return {
      latitude: receivedLocation.coords.latitude,
      longitude: receivedLocation.coords.longitude,
    }
  } catch (err) {
    console.log(err);
  }
}



