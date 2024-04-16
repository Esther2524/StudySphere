import { StatusBar } from "expo-status-bar";
import AuthStackNav from "./src/components/navigation/AuthStackNav";
import AppTabNav from "./src/components/navigation/AppTabNav";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/api/FirestoreConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import SplashScreen from "./src/components/screens/SplashScreen";
import Animated, { FadeOut } from "react-native-reanimated";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = new QueryClient();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setIsAuthed(true);
      else setIsAuthed(false);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {isLoading && <SplashScreen />}
        {!isAuthed && !isLoading && <AuthStackNav />}
        {isAuthed && !isLoading && <AppTabNav />}
        <StatusBar style="light" />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
