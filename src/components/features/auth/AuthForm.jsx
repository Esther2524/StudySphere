import { Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import InputWithLabel from "../../ui/InputWithLabel";
import PressableButton from "../../ui/PressableButton";
import { useNavigation } from "@react-navigation/native";

export default function AuthForm({ mode }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const isLogInMode = mode === "login";

  const handleLogin = () => {};

  const handleSignup = () => {};

  const authHandler = isLogInMode ? handleLogin : handleSignup;

  const navHandler = () => {
    const target = isLogInMode ? "Sign up" : "Login";
    navigation.reset({ routes: [{ name: target }] });
  };

  const pressableHint = isLogInMode
    ? "Not an user? Sign up"
    : "Alreay an user? Log in";

  return (
    <>
      <InputWithLabel label="Email" content={email} setContent={setEmail} />
      <InputWithLabel label="Password" content={pwd} setContent={setPwd} />
      {mode === "signup" && (
        <InputWithLabel
          label="Confirm Password"
          content={confirmPwd}
          setContent={setConfirmPwd}
        />
      )}
      <PressableButton
        containerStyle={styles.loginBtnContainer}
        onPress={authHandler}
      >
        <Text style={styles.loginBtnText}>
          {isLogInMode ? "Log In" : "Sign Up"}
        </Text>
      </PressableButton>
      <PressableButton onPress={navHandler}>
        <Text style={styles.pressableText}>{pressableHint}</Text>
      </PressableButton>
    </>
  );
}

const styles = StyleSheet.create({
  loginBtnContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 1000,
    marginHorizontal: "auto",
    backgroundColor: "white",
    marginVertical: 15,
    width: 100,
  },
  loginBtnText: {
    fontSize: 16,
    textAlign: "center",
  },
  pressableText: {
    color: "white",
    fontSize: 16,
  },
});
