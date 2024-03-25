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

export async function getGroupDetail(groupId) {
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
