import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../api/FirestoreConfig";
import { getDayOfWeek, getUserRef, isSameDay } from "../../../utils/helper";

function createGroupData({ groupOwnerId, groupName }) {
  return {
    groupOwnerId,
    groupName,
    groupMembers: [{ userId: groupOwnerId, approved: true }],
  };
}

export async function getCurUserGroups() {
  const userRef = getUserRef();
  const userRes = await getDoc(userRef);
  const curUserGroups = userRes.data().groups;
  return curUserGroups;
}

export async function getAllGroupsByUser() {
  const data = [];
  const groupsRef = collection(db, "groups");
  const curUserGroups = await getCurUserGroups();
  const userGroupIds = curUserGroups.map((item) => item.groupId);

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

export async function getTodayFocusTimeByUserId(userId) {
  let totalCompletedTime = 0;

  const userFocusRef = collection(db, "users", userId, "focus");
  const focusSnapshot = await getDocs(userFocusRef);

  focusSnapshot.forEach((focusDoc) => {
    const focusData = focusDoc.data();
    const lastUpdate = focusData.lastUpdate;

    if (isSameDay(lastUpdate)) {
      totalCompletedTime += focusData.weeklyStudyTime[getDayOfWeek(lastUpdate)];
    }
  });

  return (totalCompletedTime / 60.0).toFixed(1);
}

export async function getGroupDetail(groupId) {
  const groupData = await getGroupInfo(groupId);
  const { groupMembers } = groupData;

  if (groupMembers.length === 0) return [];

  // Fetch user documents in parallel
  const userDocsPromises = groupMembers.map(({ userId }) =>
    getDoc(doc(db, "users", userId))
  );
  const userDocs = await Promise.all(userDocsPromises);

  // Fetch study times in parallel and construct user data
  const userDataPromises = userDocs.map(async (userDoc, index) => {
    const userInfo = userDoc.data();
    const userId = groupMembers[index].userId;
    // The call to getTodayFocusTimeByUserId is moved outside and done in parallel later
    return {
      userId, // Temporarily store userId to fetch study time later
      name: userInfo.userName,
      avatar: userInfo.avatar,
    };
  });

  let userData = await Promise.all(userDataPromises);

  // Fetch study times in parallel after collecting all userIds
  const studyTimePromises = userData.map((user) =>
    getTodayFocusTimeByUserId(user.userId)
  );
  const studyTimes = await Promise.all(studyTimePromises);

  // Combine user data with study times
  userData = userData.map((user, index) => ({
    ...user,
    studyTime: studyTimes[index],
  }));

  return userData;
}

export async function removeGroupFromUserGroups({ groupId, userId }) {
  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);
  const userGroups = userSnapshot.data().groups;
  const newGroupsArr = userGroups.filter((item) => item.groupId !== groupId);
  await updateDoc(userRef, { groups: newGroupsArr });
  return;
}

export async function removeUserFromGroupMembers({ groupId, userId }) {
  const groupRef = doc(db, "groups", groupId);
  const snapshot = await getDoc(groupRef);
  const groupMembers = snapshot.data().groupMembers;
  const newMembersArr = groupMembers.filter((item) => item.userId !== userId);
  await updateDoc(groupRef, { groupMembers: newMembersArr });
  return;
}

export async function deleteGroup(groupId) {
  const groupRef = doc(db, "groups", groupId);
  const snapshot = await getDoc(groupRef);
  const groupMembers = snapshot.data().groupMembers;
  const userIds = groupMembers.map((item) => item.userId);
  for (const userId of userIds) {
    await removeGroupFromUserGroups({ groupId, userId });
  }
  await deleteDoc(groupRef);
  return;
}

export async function quitGroup(groupId) {
  const userRef = getUserRef();
  const userId = userRef.id;
  await removeGroupFromUserGroups({ groupId, userId });
  await removeUserFromGroupMembers({ groupId, userId });
}
