import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import ModalView from "../../ui/ModalView";
import FormOperationBar from "../../ui/FormOperationBar";
import InputWithLabel from "../../ui/InputWithLabel";

export default function AddGroupModal({ setIsAddingGroup }) {
  const [groupName, setGroupName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const cancelHandler = useCallback(() => {
    setIsAddingGroup(false);
  }, [setIsAddingGroup]);

  const confirmHandler = useCallback(() => {
    if (!groupName) {
      setErrMsg("Group name can't be empty!");
      return;
    }
    setIsAddingGroup(false);
  }, [groupName, setErrMsg, setIsAddingGroup]);

  return (
    <ModalView isVisible>
      <View style={styles.modalView}>
        <Text style={styles.title}>Create New Group</Text>
        <View style={{ alignItems: "center" }}>
          <InputWithLabel
            content={groupName}
            setContent={setGroupName}
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
