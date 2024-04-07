import { doc } from "firebase/firestore";
import { auth, db } from "../api/FirestoreConfig";

export function limitStrLen(str, len) {
  if (str.length <= len) return str;
  return str.slice(0, len - 3) + "...";
}

export function isValidEmail(email) {
  if (!email.includes("@")) return false;
  const [local, domain] = email.split("@");
  if (local.length === 0) return false;
  if (!domain.includes(".")) return false;
  const [sld, tld] = domain.split(".", 2);
  if (sld.length === 0 || tld.length === 0) return false;
  return true;
}

export function getDefaultUserName(email) {
  if (!email.includes("@")) return email;
  return email.split("@")[0];
}

export function getUserRef() {
  const uid = auth.currentUser.uid;
  return doc(db, "users", uid);
}

export function getDayOfWeek(timeInput) {
  let date;

  // Check if the input is a Firebase Timestamp
  if (timeInput instanceof Date) {
    // It's already a JavaScript Date object
    date = timeInput;
  } else if (timeInput && typeof timeInput.toDate === "function") {
    // It's a Firebase Timestamp, so convert it to a Date object
    date = timeInput.toDate();
  } else {
    // Invalid timeInput
    throw new Error(
      "Invalid timeInput: Expected a Date object or a Firebase Timestamp"
    );
  }

  // 0 for Monday, 1 for Tuesday, ..., 6 for Sunday
  const dayOfWeek =
    Number(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Vancouver",
        day: "numeric",
      }).format(date)
    ) - 1;

  return dayOfWeek;
}

export function getMonth(timeInput) {
  // Convert the Firebase Timestamp to a JavaScript Date object
  const date = timeInput.toDate();

  // Get the month (0 for January, 1 for February, ..., 11 for December)
  const month = date.getMonth();

  return month;
}

export function isSameDay(firebaseTimestamp) {
  const date = firebaseTimestamp.toDate();
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function getStartOfWeek(date) {
  const dayOfWeek = date.getUTCDay();
  const diff = (dayOfWeek + 6) % 7;
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() - diff
  );
}

export function isSameWeek(firebaseTimestamp) {
  const date = firebaseTimestamp.toDate();
  const today = new Date();

  // Get the start of the week (Monday) for both dates
  const startOfWeekForDate = getStartOfWeek(date);
  const startOfWeekForToday = getStartOfWeek(today);

  // Compare the start of the week dates
  return startOfWeekForDate.getTime() === startOfWeekForToday.getTime();
}

export function isSameMonth(firebaseTimestamp) {
  const date = firebaseTimestamp.toDate();
  const today = new Date();

  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isSameYear(firebaseTimestamp) {
  const date = firebaseTimestamp.toDate();
  const today = new Date();

  return date.getFullYear() === today.getFullYear();
}

export function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
