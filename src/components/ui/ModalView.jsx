import { View, Modal } from "react-native";
import React from "react";

export default function ModalView({ isVisible, children }) {
  return (
    <Modal visible={isVisible} transparent>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        {children}
      </View>
    </Modal>
  );
}
