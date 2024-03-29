import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function AddIcon({ color, size = 24 }) {
  return <Ionicons name="add-circle-outline" size={size} color={color} />;
}
