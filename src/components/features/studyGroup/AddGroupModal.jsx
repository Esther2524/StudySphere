import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import ModalView from "../../ui/ModalView";
import FormOperationBar from "../../ui/FormOperationBar";
import InputWithLabel from "../../ui/InputWithLabel";
import { useNavigation } from "@react-navigation/native";
import useAddGroup from "./useAddGroup";
import { GROUP_DETAIL_SCREEN_TITLE } from "../../../utils/constants";

export default function AddGroupModal({ setShowAddGroupModal }) {
  const [groupName, setGroupName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigation = useNavigation();

  const cancelHandler = () => setShowAddGroupModal(false);

  const onAddSuccess = useCallback(({ groupName, groupId }) => {
    setShowAddGroupModal(false);
    navigation.navigate(GROUP_DETAIL_SCREEN_TITLE, {
      groupName,
      groupId,
    });
  }, []);

  const onAddError = useCallback((e) => {
    Alert.alert("Failed", e.message);
  }, []);

  const { mutate: addGroup, isPending: isAddingGroup } = useAddGroup({
    onError: onAddError,
    onSuccess: onAddSuccess,
  });

  const confirmHandler = useCallback(async () => {
    if (!groupName) {
      setErrMsg("Group name can't be empty!");
      return;
    }
    addGroup(groupName);
  }, [groupName, addGroup]);

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
            isSubmittingOuter={isAddingGroup}
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
  },
});
