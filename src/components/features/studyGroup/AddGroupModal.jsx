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
  const [groupTarget, setGroupTarget] = useState("");
  const [errMsg, setErrMsg] = useState({
    nameErr: "",
    targetErr: "",
  });
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
    let isValid = true;
    if (!groupName) {
      setErrMsg((pre) => ({
        ...pre,
        nameErr: "Group name can't be empty!",
      }));
      isValid = false;
    }
    if (isNaN(groupTarget) || !groupTarget) {
      setErrMsg((pre) => ({
        ...pre,
        targetErr: "Target must be a number!",
      }));
      isValid = false;
    }
    if (!isNaN(groupTarget) && groupTarget) {
      if (Number(groupTarget) > 24 || Number(groupTarget) < 0) {
        setErrMsg((pre) => ({
          ...pre,
          targetErr: "Target must be between 0 and 24!",
        }));
        isValid = false;
      }
    }

    if (!isValid) return;
    addGroup(groupName);
  }, [groupName, addGroup, groupTarget]);

  const setNameHandler = useCallback((newText) => {
    setErrMsg((pre) => ({ ...pre, nameErr: "" }));
    setGroupName(newText);
  }, []);

  const setTargetHandler = useCallback((newTarget) => {
    setErrMsg((pre) => ({ ...pre, targetErr: "" }));
    setGroupTarget(newTarget);
  }, []);

  return (
    <ModalView isVisible>
      <View style={styles.modalView}>
        <Text style={styles.title}>Create New Group</Text>
        <View style={{ alignItems: "center" }}>
          <InputWithLabel
            label="Group Name *"
            content={groupName}
            setContent={setNameHandler}
            containerStyle={styles.input}
            placeholder="Enter Your Group's Name"
            errorMsg={errMsg.nameErr}
          />
          <InputWithLabel
            label="Target Hours *"
            content={groupTarget}
            setContent={setTargetHandler}
            containerStyle={styles.input}
            placeholder="Set target hours"
            keyboardType="numeric"
            errorMsg={errMsg.targetErr}
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
    marginTop: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 20,
  },
  input: {
    width: 300,
    height: 100,
    marginBottom: 10,
  },
});
