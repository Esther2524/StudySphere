import { Pressable, StyleSheet } from "react-native";
import React from "react";

// Using children allows us to pass any React element (e.g., text, icons) 
// to the button, making the component more versatile. 
export default function PressableButton({ onPress, containerStyle, children, disabled=false }) {
  return (
    <Pressable
      onPress={() => {
        if (!disabled) {
          onPress();
        }
      }}
      // android_ripple={{color: Colors.androidRipple, borderless: false}} // apply the ripple effect for Android
      style={({ pressed }) => [
        styles.defaultStyle,
        containerStyle,
        pressed && styles.pressed,
      ]}
      disabled={disabled}
    >
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    padding: 1,
  },
  pressed: {
    // an opacity value of 0.5 reduces the visibility of the component to half, making it semi-transparent
    opacity: 0.5,
  },
})