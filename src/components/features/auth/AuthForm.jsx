import { Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import React, { useCallback, useState } from "react";
import InputWithLabel from "../../ui/InputWithLabel";
import PressableButton from "../../ui/PressableButton";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utils/Colors";
import { getDefaultUserName, isValidEmail } from "../../../utils/helper";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../../api/FirestoreConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import FormOperationBar from "../../ui/FormOperationBar";

export default function AuthForm({ mode }) {
  const navigation = useNavigation();
  const [formInfo, setFormInto] = useState({
    email: "",
    pwd: "",
    confirmPwd: "",
  });
  const { email, pwd, confirmPwd } = formInfo;
  const [errors, setErrors] = useState({
    emailErr: "",
    pwdErr: "",
    confirmPwdErr: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogInMode = mode === "login";

  const setFieldContent = useCallback((field, content) => {
    setFormInto((pre) => ({ ...pre, [field]: content }));
  }, []);

  const setFieldError = useCallback((errField, errContent) => {
    setErrors((pre) => ({ ...pre, [errField]: errContent }));
  }, []);

  const isFormValid = useCallback(() => {
    let isValid = true;
    if (!isValidEmail(email)) {
      setFieldError("emailErr", "Please input a valid email address!");
      isValid = false;
    }
    if (!pwd) {
      setFieldError("pwdErr", "Password can't be empty!");
      isValid = false;
    }
    if (!isLogInMode && pwd !== confirmPwd) {
      setFieldError(
        "confirmPwdErr",
        "Passwords must match. Please check again."
      );
      isValid = false;
    }
    return isValid;
  }, [email, pwd, confirmPwd, isValidEmail]);

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
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      // provide specific msg for wrong password?
      if (error.code === "auth/invalid-credential") {
        Alert.alert(
          "Login Failed",
          "No account found with this email, or wrong password. Please sign up if you don't have an account."
        );
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pwd
      );
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

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Signup Failed",
          "An account with this email already exists. Please log in or use a different email."
        );
      } else {
        Alert.alert("Signup Failed", error.message);
      }
    }
  };

  const authHandler = isLogInMode ? handleLogin : handleSignup;
  const confirmText = isLogInMode ? "Log In" : "Sign Up";

  const navHandler = () => {
    const target = isLogInMode ? "Sign up" : "Login";
    navigation.reset({ routes: [{ name: target }] });
  };

  const pressableHint = isLogInMode
    ? "Not an user? Sign up"
    : "Alreay an user? Log in";

  const updateInputWithErr = (field) => {
    return (newContent) => {
      setFieldContent(field, newContent);
      setFieldError(field, "");
    };
  };

  return (
    <>
      <InputWithLabel
        label="Email"
        labelStyle={styles.labelStyle}
        content={email}
        setContent={updateInputWithErr("email")}
        inputTextStyle={styles.inputTextStyle}
        errorMsg={errors.emailErr}
      />
      <InputWithLabel
        label="Password"
        labelStyle={styles.labelStyle}
        content={pwd}
        setContent={updateInputWithErr("pwd")}
        secureTextEntry={true}
        inputTextStyle={styles.inputTextStyle}
        errorMsg={errors.pwdErr}
      />
      {mode === "signup" && (
        <InputWithLabel
          label="Confirm Password"
          labelStyle={styles.labelStyle}
          content={confirmPwd}
          setContent={updateInputWithErr("confirmPwd")}
          inputTextStyle={styles.inputTextStyle}
          errorMsg={errors.confirmPwdErr}
          secureTextEntry={true}
        />
      )}

      <FormOperationBar
        hasCancelBtn={false}
        confirmHandler={authHandler}
        confirmText={confirmText}
        theme="shallow"
        extraContainerStyle={{ marginTop: 15 }}
      />
      <PressableButton
        onPress={navHandler}
        containerStyle={styles.pressableTextContainer}
        disabled={isSubmitting}
      >
        <Text
          style={[styles.pressableText, { opacity: isSubmitting ? 0.5 : 1 }]}
        >
          {pressableHint}
        </Text>
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
    marginTop: 15,
    marginBottom: 60,
  },
  pressableText: {
    color: "white",
    fontSize: 16,
  },
  inputTextStyle: {
    color: Colors.shallowTextColor,
  },
  labelStyle: {
    color: Colors.shallowTextColor,
  },
});
