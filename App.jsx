import { StatusBar } from "expo-status-bar";
import AuthStackNav from "./src/components/navigation/AuthStackNav";
import AppTabNav from "./src/components/navigation/AppTabNav";
import { NavigationContainer } from "@react-navigation/native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/api/FirestoreConfig";

export default function App() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setIsAuthed(true);
      else setIsAuthed(false);
    });
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        {!isAuthed && <AuthStackNav />}
        {isAuthed && <AppTabNav />}
        <StatusBar style="light" />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
