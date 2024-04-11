import { View, Modal, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";

export default function ModalView({ isVisible, children }) {
  return (
    <Modal visible={isVisible} transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        {children}
      </KeyboardAvoidingView>
    </Modal>
  );
}
