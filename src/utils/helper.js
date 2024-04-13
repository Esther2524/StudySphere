import { doc } from "firebase/firestore";
import { auth, db } from "../api/FirestoreConfig";
import moment from "moment-timezone";
import { TIMEZONE } from "./constants";

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
  const dayOfWeek = (moment(date).tz(TIMEZONE).day() + 6) % 7;

  return dayOfWeek;
}

export function getMonth(dateObj) {
  return moment(dateObj).tz(TIMEZONE).month();
}

export function getFullYear(dateObj) {
  return moment(dateObj).tz(TIMEZONE).year();
}

export function getDate(dateObj) {
  return moment(dateObj).tz(TIMEZONE).date();
}

export function isSameDay(firebaseTimestamp) {
  const date = firebaseTimestamp.toDate();
  const today = new Date();

  return (
    getDate(date) === getDate(today) &&
    getMonth(date) === getMonth(today) &&
    getFullYear(date) === getFullYear(today)
  );
}

export function getStartOfWeek(date) {
  const dayOfWeek = getDayOfWeek(date);
  return new Date(getFullYear(date), getMonth(date), getDate(date) - dayOfWeek);
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
    getMonth(date) === getMonth(today) &&
    getFullYear(date) === getFullYear(today)
  );
}

export function isSameYear(firebaseTimestamp) {
  const date = firebaseTimestamp.toDate();
  const today = new Date();

  return getFullYear(date) === getFullYear(today);
}

export function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function extractHourAndMinute(date) {
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const [hour, minute] = timeString.split(":");

  return { hour: Number(hour), minute: Number(minute) };
}
