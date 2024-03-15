import React from "react";
import CenterLayout from "../ui/CenterLayout";
import AuthForm from "../features/auth/AuthForm";

export default function SignupScreen() {
  return (
    <CenterLayout>
      <AuthForm mode="signup" />
    </CenterLayout>
  );
}
