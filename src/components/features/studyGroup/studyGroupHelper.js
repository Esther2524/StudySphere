import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../api/FirestoreConfig";
import { getUserRef } from "../../../utils/helper";

export function createGroupData({ groupOwnerId, groupName }) {
  return {
    groupOwnerId,
    groupName,
    groupMembers: [{ userId: groupOwnerId, approved: true }],
  };
}

export async function getAllGroupsByUser() {
  const data = [];
  const userRef = getUserRef();
  const groupsRef = collection(db, "groups");
  const userRes = await getDoc(userRef);
  const userGroupIds = userRes.data().groups.map((item) => item.groupId);

  const q = query(groupsRef, where(documentId(), "in", userGroupIds));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    data.push({
      groupId: doc.id,
      groupSize: doc.data().groupMembers.length,
      groupName: doc.data().groupName,
      groupOwnerId: doc.data().groupOwnerId,
    });
  });
  return data;
}

export async function getGroupDetail(groupId) {
  const docRef = doc(db, "groups", groupId);
  const res = await getDoc(docRef);
  return res.data();
}
