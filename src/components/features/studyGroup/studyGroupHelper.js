export function createGroupData({ groupOwnerId, groupName }) {
  return {
    groupOwnerId,
    groupName,
    groupMembers: [{ userId: groupOwnerId, approved: true }],
  };
}
