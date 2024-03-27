import { Timestamp, collection, getDocs } from "firebase/firestore";
import { getDayOfWeek, getUserRef, isSameWeek } from "../../../utils/helper";
import { db } from "../../../api/FirestoreConfig";

const pieColors = ["#F66D44", "#FEAE65", "#AADEA7", "#64C2A6", "#2D87BB"];

export async function getDailyFocusInfo() {
  const userRef = getUserRef();
  const userId = userRef.id;
  const focusSnapshot = await getDocs(collection(db, "users", userId, "focus"));
  const data = focusSnapshot.docs.map((doc) => {
    const focusData = doc.data();
    const lastUpdate = focusData.lastUpdate;
    const focusTime = isSameWeek(lastUpdate)
      ? focusData.weeklyStudyTime[getDayOfWeek(Timestamp.fromDate(new Date()))]
      : 0;
    return {
      title: focusData.title,
      focusTime,
      numOfCompletions: focusData.todayTimes,
      numOfBreaks: focusData.todayBreaks,
    };
  });

  return data;
}

export function getDailyOverview(dailyFocusInfo) {
  const result = dailyFocusInfo.reduce(
    (pre, cur) => {
      pre.numOfCompletions += cur.numOfCompletions;
      pre.focusTime += cur.focusTime;
      pre.numOfBreaks += cur.numOfBreaks;
      return pre;
    },
    { numOfCompletions: 0, focusTime: 0, numOfBreaks: 0 }
  );

  return result;
}

// If rawData's length is greater than maxSize,
// aggregate the extra ones as 'others'
// Also, use value instead of focusTime. This is required by PieChart data prop
export function parsePieData(rawData) {
  // First, sort the array without modifying the original one
  const sortedData = rawData
    .map((item) => ({ title: item.title, value: item.focusTime }))
    .sort((a, b) => b.value - a.value);
  const maxSize = pieColors.length;

  // Work with a new array which initially is a shallow copy of the sorted data
  let newData = sortedData.slice(0, maxSize - 1);

  if (sortedData.length > maxSize) {
    // Calculate the sum of `value` for all items beyond the maxSize
    const othersTime = sortedData
      .slice(maxSize)
      .reduce((acc, curr) => acc + curr.value, 0);

    // Create an 'Others' entry with the accumulated `value`
    const othersEntry = {
      title: "Others",
      value: othersTime,
    };

    // Append the 'Others' entry to the newData array
    newData = [...newData, othersEntry];
  }

  newData.forEach((item, ind) => (item.color = pieColors[ind]));
  return newData;
}
