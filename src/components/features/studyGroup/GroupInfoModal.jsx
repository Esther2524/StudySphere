import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import ModalView from "../../ui/ModalView";
import FormOperationBar from "../../ui/FormOperationBar";
import InputWithLabel from "../../ui/InputWithLabel";
import useAddGroup from "./useAddGroup";
import useEditGroup from "./useEditGroup";

export default function GroupInfoModal({
  setShowModal,
  groupId,
  preName,
  preTarget,
  onMutateSuccess,
  isCreating,
}) {
  const [groupName, setGroupName] = useState(preName || "");
  const [groupTarget, setGroupTarget] = useState(preTarget || "");
  const [errMsg, setErrMsg] = useState({
    nameErr: "",
    targetErr: "",
  });

  const cancelHandler = () => setShowModal(false);

  const onMutateError = useCallback((e) => {
    Alert.alert("Failed", e.message);
  }, []);

  const { mutate, isPending } = isCreating
    ? useAddGroup({
        onError: onMutateError,
        onSuccess: onMutateSuccess,
      })
    : useEditGroup({ onSuccess: onMutateSuccess, onError: onMutateError });

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
      if (Number(groupTarget) <= 0) {
        setErrMsg((pre) => ({
          ...pre,
          targetErr: "Target must be greater than 0!",
        }));
        isValid = false;
      } else if (Number(groupTarget) > 24) {
        setErrMsg((pre) => ({
          ...pre,
          targetErr: "Target can't exceed 24!",
        }));
        isValid = false;
      }
    }

    if (!isValid) return;
    if (isCreating) mutate({ groupName, groupTarget: Number(groupTarget) });
    else mutate({ groupId, groupName, groupTarget: Number(groupTarget) });
  }, [groupName, mutate, groupTarget, groupId]);

  const setNameHandler = useCallback((newText) => {
    setErrMsg((pre) => ({ ...pre, nameErr: "" }));
    setGroupName(newText);
  }, []);

  const setTargetHandler = useCallback((newTarget) => {
    setErrMsg((pre) => ({ ...pre, targetErr: "" }));
    setGroupTarget(newTarget);
  }, []);

  return (
    <ModalView isVisible={true}>
      <View style={styles.modalView}>
        <Text style={styles.title}>
          {isCreating ? "Create New Group" : "Edit Group"}
        </Text>
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
            isSubmittingOuter={isPending}
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
