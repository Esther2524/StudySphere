import {
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../api/FirestoreConfig";

export async function searchGroup(keyword) {
  const data = [];
  if (!keyword) return data;
  const groupsRef = collection(db, "groups");
  const q = query(groupsRef, where("groupName", ">=", keyword));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) =>
    data.push({
      groupName: doc.data().groupName,
      groupSize: doc.data().groupMembers.length,
      groupId: doc.id,
    })
  );
  return data;
}
