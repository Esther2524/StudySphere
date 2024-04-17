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
import { getCurUserGroups } from "../studyGroup/studyGroupHelper";
import { getUserRef } from "../../../utils/helper";
import { DEFAULT_GROUP_TARGET } from "../../../utils/constants";

export async function searchGroup(keyword, abortSignal) {
  const data = [];
  if (!keyword) return data;

  if (abortSignal && abortSignal.aborted) {
    throw new Error("The search was aborted.");
  }

  const curUserGroups = await getCurUserGroups();
  const joinedGroupsIds = curUserGroups.map((item) => item.groupId);

  const groupsRef = collection(db, "groups");
  const q = query(groupsRef, where("groupName", ">=", keyword));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) =>
    data.push({
      groupName: doc.data().groupName,
      groupSize: doc.data().groupMembers.length,
      groupId: doc.id,
      groupTarget: doc.data().groupTarget || DEFAULT_GROUP_TARGET,
      joined: joinedGroupsIds.includes(doc.id),
    })
  );
  return data;
}

export async function joinGroupById(groupId) {
  const userRef = getUserRef();
  const targetGroupRef = doc(db, "groups", groupId);

  const curUserGroups = await getCurUserGroups();
  curUserGroups.push({ groupId, joined: true });
  await updateDoc(userRef, { groups: curUserGroups });

  const targetGroupSnapshot = await getDoc(targetGroupRef);
  const targetGroupMembers = targetGroupSnapshot.data().groupMembers;
  targetGroupMembers.push({
    userId: userRef.id,
    approved: true,
    likesCount: 0,
  });
  await updateDoc(targetGroupRef, {
    groupMembers: targetGroupMembers,
  });

  return groupId;
}
