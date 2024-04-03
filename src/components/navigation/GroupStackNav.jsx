import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudyGroupScreen from "../screens/StudyGroupScreen";
import { Colors } from "../../utils/Colors";
import GroupDetailsScreen from "../screens/GroupDetailsScreen";
import { limitStrLen } from "../../utils/helper";
import GroupDetailHeaderMenu from "../features/studyGroup/GroupDetailHeaderMenu";
import {
  GROUP_DETAIL_SCREEN_TITLE,
  GROUP_SCREEN_TITLE,
} from "../../utils/constants";

export default function GroupStackNav() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={GROUP_SCREEN_TITLE}
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: Colors.headerTitleColor,
        },
        headerStyle: {
          backgroundColor: Colors.screenBgColor,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name={GROUP_SCREEN_TITLE} component={StudyGroupScreen} />
      <Stack.Screen
        name={GROUP_DETAIL_SCREEN_TITLE}
        component={GroupDetailsScreen}
        options={({ route }) => ({
          title: limitStrLen(route.params.groupName, 25),
          headerBackTitle: "Back",
          headerTintColor: Colors.headerTitleColor,
          headerRight: () => (
            <GroupDetailHeaderMenu
              groupId={route.params.groupId}
              groupOwnerId={route.params.groupOwnerId}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
