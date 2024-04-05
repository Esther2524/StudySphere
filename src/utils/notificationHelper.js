import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { extractHourAndMinute } from "./helper";
import {
  REMINDER_TYPE_DAILY,
  REMINDER_TYPE_WEEKDAY,
  REMINDER_TYPE_WEEKEND,
} from "./constants";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    alert("This is not a physical device, so notification is disabled!");
    return;
  }

  return token.data;
}

export async function scheduleReminderHelper({
  title,
  message,
  time,
  weekday,
}) {
  const { hour, minute } = extractHourAndMinute(time);
  let trigger = { hour, minute, repeats: true };
  if (weekday) trigger["weekday"] = weekday;
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: message,
      // sound: 'default',
    },
    trigger,
  });
  return id;
}

export function scheduleReminder({ title, message, time, reminderType }) {
  if (reminderType === REMINDER_TYPE_DAILY) {
    scheduleReminderHelper({ title, time, message });
    return;
  }

  // 1 means Sunday, so weekday should be from 2 to 6
  if (reminderType === REMINDER_TYPE_WEEKDAY) {
    for (let i = 2; i <= 6; i++) {
      scheduleReminderHelper({ title, time, message, weekday: i });
    }
    return;
  }

  if (reminderType === REMINDER_TYPE_WEEKEND) {
    scheduleReminderHelper({ title, time, message, weekday: 1 });
    scheduleReminderHelper({ title, time, message, weekday: 7 });

    return;
  }
}
