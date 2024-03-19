import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import ModalView from "../../ui/ModalView";
import FormOperationBar from "../../ui/FormOperationBar";
import InputWithLabel from "../../ui/InputWithLabel";

export default function AddGroupModal({ isAddingGroup, setIsAddingGroup }) {
  const [groupName, setGroupName] = useState("");

  const cancelHandler = useCallback(() => {
    setIsAddingGroup(false);
  }, []);

  const confirmHandler = useCallback(() => {
    setIsAddingGroup(false);
  }, []);

  return (
    <ModalView isVisible={isAddingGroup}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Create New Group</Text>
        <View style={{ alignItems: "center" }}>
          <InputWithLabel
            content={groupName}
            setContent={setGroupName}
            style={styles.input}
            placeholder="Enter Your Group's Name"
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
    marginBottom: 10,
    fontSize: 20,
  },
  input: {
    width: 300,
    height: 80,
    marginBottom: 10,
  },
});
