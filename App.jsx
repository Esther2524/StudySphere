import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthStackNav from "./src/components/navigation/AuthStackNav";
import AppTabNav from "./src/components/navigation/AppTabNav";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";

export default function App() {
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <NavigationContainer>
      {!isAuthed && <AuthStackNav />}
      {isAuthed && <AppTabNav />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
