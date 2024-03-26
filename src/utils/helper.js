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

export function getDayOfWeek(firebaseTimestamp) {
  // Convert the Firebase Timestamp to a JavaScript Date object
  const date = firebaseTimestamp.toDate();

  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  let dayOfWeek = date.getDay();

  // Adjust the day of the week to match the desired format (0 for Monday, ..., 6 for Sunday)
  dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  return dayOfWeek;
}

export function getMonth(firebaseTimestamp) {
  // Convert the Firebase Timestamp to a JavaScript Date object
  const date = firebaseTimestamp.toDate();

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
