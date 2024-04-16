import { ImageBackground } from "react-native";
import React from "react";

export default function SplashScreen() {
  return (
    <ImageBackground
      source={require("../../../assets/splash.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    />
  );
}
