import React from "react";
import CenterLayout from "../ui/CenterLayout";
import AuthForm from "../features/auth/AuthForm";
import BasicLayout from "../ui/BasicLayout";
import { View } from "react-native";

export default function LoginScreen() {
  return (
    <CenterLayout>
      <AuthForm mode="login" />
    </CenterLayout>
  );
}
