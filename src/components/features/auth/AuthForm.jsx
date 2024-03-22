import { Text, StyleSheet, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import InputWithLabel from "../../ui/InputWithLabel";
import PressableButton from "../../ui/PressableButton";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utils/Colors";
import { useStore } from "../../../hooks/Store";
import { getDefaultUserName, isValidEmail } from "../../../utils/helper";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../api/FirestoreConfig";
import { Spinner } from "@gluestack-ui/themed";

export default function AuthForm({ mode }) {
  const navigation = useNavigation();
  // For convenience of dev, use a default email here.
  const [email, setEmail] = useState("Alex@madeup.com");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [errors, setErrors] = useState({
    emailErr: "",
    pwdErr: "",
    confirmPwdErr: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usersCollectionRef = collection(db, "users");

  const setIsAuthed = useStore((state) => state.setIsAuthed);
  const setUserId = useStore((state) => state.setCurrentUser);

  const isLogInMode = mode === "login";

  const isFormValid = useCallback(() => {
    let isValid = true;
    if (!isValidEmail(email)) {
      setErrors((pre) => ({
        ...pre,
        emailErr: "Please input a valid email address!",
      }));
      isValid = false;
    }
    if (!isLogInMode && pwd !== confirmPwd) {
      setErrors((pre) => ({
        ...pre,
        confirmPwdErr: "Two passwords don't match!",
      }));
      isValid = false;
    }
    return isValid;
  }, [email, pwd, confirmPwd, isValidEmail, setErrors]);

  const handleLogin = async () => {
    if (!isFormValid()) {
      return;
    }
    setIsSubmitting(true);
    const userRef = doc(usersCollectionRef, email);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      setUserId(userSnap.id);
      setIsAuthed(true);
      return;
    }
    setIsSubmitting(false);
    Alert.alert("User doesn't exist. Please Sign up first.");
  };

  const handleSignup = async () => {
    if (!isFormValid()) {
      return;
    }
    setIsSubmitting(true);
    const userRef = doc(usersCollectionRef, email);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      setIsSubmitting(false);
      Alert.alert("User already exists. Please log in.");
      return;
    }
    const newUserData = {
      userEmail: email,
      userName: getDefaultUserName(email),
      groups: [],
    };
    await setDoc(doc(usersCollectionRef, email), newUserData);
    setUserId(email);
    setIsAuthed(true);
  };

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
      <InputWithLabel
        label="Email"
        content={email}
        setContent={setEmail}
        inputTextStyle={styles.inputTextStyle}
        errorMsg={errors.emailErr}
      />
      <InputWithLabel
        label="Password"
        content={pwd}
        setContent={setPwd}
        secureTextEntry={true}
        inputTextStyle={styles.inputTextStyle}
        errorMsg={errors.pwdErr}
      />
      {mode === "signup" && (
        <InputWithLabel
          label="Confirm Password"
          content={confirmPwd}
          setContent={setConfirmPwd}
          inputTextStyle={styles.inputTextStyle}
          errorMsg={errors.confirmPwdErr}
        />
      )}

      <PressableButton
        containerStyle={[
          styles.loginBtnContainer,
          { width: isSubmitting ? 135 : "auto" },
        ]}
        onPress={authHandler}
        disabled={isSubmitting}
      >
        {!isSubmitting && (
          <Text style={styles.submitBtnText}>
            {isLogInMode ? "Log In" : "Sign Up"}
          </Text>
        )}
        {isSubmitting && (
          <>
            <Text style={styles.submitBtnText}>Loading...</Text>
            <Spinner marginLeft={10} />
          </>
        )}
      </PressableButton>
      <PressableButton
        onPress={navHandler}
        containerStyle={styles.pressableTextContainer}
        disabled={isSubmitting}
      >
        <Text style={styles.pressableText}>{pressableHint}</Text>
      </PressableButton>
    </>
  );
}

const styles = StyleSheet.create({
  loginBtnContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 1000,
    marginHorizontal: "auto",
    backgroundColor: Colors.cardBgColor,
    marginTop: 15,
    marginBottom: 15,
  },
  submitBtnText: {
    fontSize: 16,
    textAlign: "center",
  },
  pressableTextContainer: {
    marginBottom: 60,
  },
  pressableText: {
    color: "white",
    fontSize: 16,
  },
  inputTextStyle: {
    color: Colors.shallowTextColor,
  },
});
