import { StatusBar } from "expo-status-bar";
import AuthStackNav from "./src/components/navigation/AuthStackNav";
import AppTabNav from "./src/components/navigation/AppTabNav";
import { NavigationContainer } from "@react-navigation/native";
import { useStore } from "./src/hooks/Store";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

export default function App() {
  const isAuthed = useStore((state) => state.isAuthed);

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
