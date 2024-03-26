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
  const date = firebaseTimestamp.toDate();

  let dayOfWeek = date.getDay();

  dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  return dayOfWeek;
}

export function getMonth(firebaseTimestamp) {
  const date = firebaseTimestamp.toDate();

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
