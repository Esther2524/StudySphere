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
import { getUserRef } from "../../../utils/helper";

function createGroupData({ groupOwnerId, groupName }) {
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

  if (userGroupIds.length === 0) return data;

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

export async function getGroupInfo(groupId) {
  const docRef = doc(db, "groups", groupId);
  const res = await getDoc(docRef);
  return res.data();
}

export async function addGroupApi(groupName) {
  const userRef = getUserRef();
  const groupRef = collection(db, "groups");

  // Generate group document data
  const newGroupData = createGroupData({
    groupOwnerId: userRef.id,
    groupName,
  });

  // Add new group to group collection
  const newGroupRef = await addDoc(groupRef, newGroupData);

  // Add groupId to user's groups field
  const userData = await getDoc(userRef);
  const curGroups = userData.data().groups;
  curGroups.push({ groupId: newGroupRef.id, joined: true });
  await updateDoc(userRef, {
    groups: curGroups,
  });
  return { ...newGroupData, groupId: newGroupRef.id };
}

async function getTodayFocusTimeByUserId(userId) {
  let totalCompletedTime = 0;

  const userFocusRef = collection(db, "users", userId, "focus");
  const focusSnapshot = await getDocs(userFocusRef);

  for (const focusDoc of focusSnapshot.docs) {
    const focusDocRef = doc(db, `users/${userId}/focus/${focusDoc.id}`);
    const focusRes = await getDoc(focusDocRef);

    const lastUpdate = focusRes.data().lastUpdate.toDate();
    const today = new Date();
    const isToday =
      lastUpdate.getDate() === today.getDate() &&
      lastUpdate.getMonth() === today.getMonth() &&
      lastUpdate.getFullYear() === today.getFullYear();

    if (isToday) totalCompletedTime += focusRes.data().todayStudyTime;
  }

  return (totalCompletedTime / 60.0).toFixed(1);
}

export async function getGroupDetail(groupId) {
  const groupData = await getGroupInfo(groupId);
  const { groupMembers } = groupData;
  const userIds = groupMembers.map((item) => item.userId);

  const data = [];

  if (userIds.length === 0) return data;

  for (const userId of userIds) {
    const userRes = await getDoc(doc(db, "users", userId));
    const userInfoItem = {
      name: userRes.data().userName,
      avatar: userRes.data().avatar,
      studyTime: await getTodayFocusTimeByUserId(userId),
    };
    data.push(userInfoItem);
  }

  return data;
}
