import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import ModalView from "../../ui/ModalView";
import FormOperationBar from "../../ui/FormOperationBar";
import InputWithLabel from "../../ui/InputWithLabel";
import { getUserRef } from "../../../utils/helper";
import { addDoc, collection, getDoc, updateDoc } from "firebase/firestore";
import { createGroupData } from "./studyGroupHelper";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../api/FirestoreConfig";

export default function AddGroupModal({ setIsAddingGroup }) {
  const [groupName, setGroupName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();

  const userRef = getUserRef();
  const groupRef = collection(db, "groups");

  const cancelHandler = useCallback(() => {
    setIsAddingGroup(false);
  }, [setIsAddingGroup]);

  const confirmHandler = useCallback(async () => {
    if (!groupName) {
      setErrMsg("Group name can't be empty!");
      return;
    }
    setIsSubmitting(true);

    // Generate group document data
    const newGroupData = createGroupData({
      groupOwnerId: userRef.id,
      groupName,
    });

    // Add the group to firebase
    try {
      // Add new group to group collection
      const newGroupRef = await addDoc(groupRef, newGroupData);

      // Add groupId to user's groups field
      const userData = await getDoc(userRef);
      const preGroups = userData.data().groups;
      preGroups.push({ groupId: newGroupRef.id, joined: true });
      await updateDoc(userRef, {
        groups: preGroups,
      });

      setIsAddingGroup(false);
      navigation.navigate("Group Detail", {
        groupName,
        groupId: newGroupRef.id,
      });
      return;
    } catch (e) {
      setIsSubmitting(false);
      Alert.alert("Failed", e.message);
    }
  }, [groupName, createGroupData, userRef, groupRef, navigation]);

  const inputHandler = useCallback((newText) => {
    setErrMsg("");
    setGroupName(newText);
  }, []);

  return (
    <ModalView isVisible>
      <View style={styles.modalView}>
        <Text style={styles.title}>Create New Group</Text>
        <View style={{ alignItems: "center" }}>
          <InputWithLabel
            content={groupName}
            setContent={inputHandler}
            containerStyle={styles.input}
            placeholder="Enter Your Group's Name"
            errorMsg={errMsg}
          />
        </View>
        <View style={styles.btnGroup}>
          <FormOperationBar
            cancelText="Cancel"
            confirmText="Confirm"
            confirmHandler={confirmHandler}
            cancelHandler={cancelHandler}
            isSubmitting={isSubmitting}
            confirmDisabled={isSubmitting}
          />
        </View>
      </View>
    </ModalView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 15,
  },
  btnGroup: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 20,
  },
  input: {
    width: 300,
    height: 80,
    marginBottom: 20,
    marginTop: -10,
  },
});
