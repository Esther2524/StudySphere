import React from "react";
import CenterLayout from "../ui/CenterLayout";
import AuthForm from "../features/auth/AuthForm";

export default function LoginScreen() {
  return (
    <CenterLayout>
      <AuthForm mode="login" />
    </CenterLayout>
  );
}
