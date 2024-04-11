import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ModalView from '../../ui/ModalView';
import InputWithLabel from '../../ui/InputWithLabel';
import FormOperationBar from '../../ui/FormOperationBar';
import { Colors } from '../../../utils/Colors';

export default function EditNameModal({
  editModal,
  setEditModal,
  newUserName,
  setNewUserName,
  handleEditUserName }) {
  return (
    <ModalView isVisible={editModal}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Edit Username</Text>
        <InputWithLabel
          content={newUserName}
          setContent={setNewUserName}
          placeholder="Enter your new username"
          containerStyle={{ width: '100%', marginTop: 20 }}
        />
        <FormOperationBar
          confirmText="Save"
          cancelText="Cancel"
          confirmHandler={handleEditUserName}
          cancelHandler={() => { setEditModal(false) }}
        />
      </View>
    </ModalView>

  )
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%',
  },
  title: {
    fontSize: 18,
    color: Colors.modalTitle,
    textAlign: 'center',
  },
})