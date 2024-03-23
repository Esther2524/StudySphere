import { Text, StyleSheet, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import InputWithLabel from "../../ui/InputWithLabel";
import PressableButton from "../../ui/PressableButton";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utils/Colors";
import { useStore } from "../../../hooks/Store";
import { getDefaultUserName, isValidEmail } from "../../../utils/helper";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../../api/FirestoreConfig";
import { Spinner } from "@gluestack-ui/themed";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthForm({ mode }) {
  const navigation = useNavigation();
  // For convenience of dev, use a default email here.
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [errors, setErrors] = useState({
    emailErr: "",
    pwdErr: "",
    confirmPwdErr: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogInMode = mode === "login";

  // use isAuthed to do conditional rendering between Stack Nav and Tab Nav?
  const setIsAuthed = useStore((state) => state.setIsAuthed);


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

  // authenticate the user with Firebase Authentication
  const handleLogin = async () => {
    if (!isFormValid()) {
      return;
    }
    setIsSubmitting(true);

    try {
      // if signInWithEmailAndPassword doesn't throw, login is successful
      await signInWithEmailAndPassword(auth, email, pwd);
      // navigate to the Focus List screen
      setIsAuthed(true);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      // provide specific msg for wrong password?
      if (error.code === 'auth/invalid-credential') {
        Alert.alert("Login Failed", "No account found with this email, or wrong password. Please sign up if you don't have an account.");
      } else {
        Alert.alert("Login Failed", error.message); // handle other errors
      }
    }
  };



  const handleSignup = async () => {
    if (!isFormValid()) {
      return;
    }
    setIsSubmitting(true);

    try {
      // create the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
      const user = userCredential.user;

      // create a new document in Firestore for the user
      const newUserData = {
        userEmail: email,
        userName: getDefaultUserName(email),
        avatar: "",
        status: "",
        reminder: [],
        groups: [],
      };

      await setDoc(doc(db, "users", user.uid), newUserData);

      navigation.navigate("Login");
      setIsSubmitting(false);

    } catch (error) {
      setIsSubmitting(false);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert("Signup Failed", "An account with this email already exists. Please log in or use a different email.");
      } else {
        Alert.alert("Signup Failed", error.message);
      }
    }
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
