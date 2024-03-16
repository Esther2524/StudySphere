import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudyGroupScreen from "../screens/StudyGroupScreen";
import { Colors } from "../../utils/Colors";
import PressableButton from "../ui/PressableButton";
import AddIcon from "../ui/AddIcon";

export default function GroupStackNav() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: Colors.headerTitleColor,
        },
        headerStyle: {
          backgroundColor: Colors.screenBgColor,
        },
        headerShadowVisible: false,
        headerRight: () => {
          return (
            <PressableButton onPress={null}>
              <AddIcon color={Colors.headerTitleColor} size={30} />
            </PressableButton>
          );
        },
      }}
    >
      <Stack.Screen name="Study Group" component={StudyGroupScreen} />
    </Stack.Navigator>
  );
}
