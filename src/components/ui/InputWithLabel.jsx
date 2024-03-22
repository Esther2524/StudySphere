import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../utils/Colors";

export default function InputWithLabel({
  label,
  content,
  setContent,
  inputType = "text",
  errorMsg,
  children,
  zIndex = 10,
  onPressIn,
  inputMode,
  editable = true,
  placeholder,
  containerStyle,
  secureTextEntry,
  inputTextStyle,
}) {
  const optionalProps = editable
    ? { onChangeText: (newContent) => setContent(newContent) }
    : { onFocus: () => Keyboard.dismiss() };

  return (
    <View style={[{ ...styles.container, zIndex: zIndex }, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {inputType === "text" && (
        <>
          <TextInput
            value={content + ""}
            {...optionalProps}
            style={[styles.textInput, inputTextStyle]}
            onPressIn={onPressIn}
            placeholder={placeholder}
            inputMode={inputMode}
            secureTextEntry={secureTextEntry}
          />
          <Text style={styles.error}>{errorMsg}</Text>
        </>
      )}
      {inputType === "other" && children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "auto",
    width: 360,
    padding: 10,
    height: 100,
  },
  textInput: {
    borderColor: Colors.colorYellow,
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
    color: Colors.mainText,
  },
  label: {
    fontSize: 16,
    paddingHorizontal: 5,
    fontWeight: "bold",
    color: Colors.inputLabelColor,
  },
  error: {
    paddingHorizontal: 2,
    fontSize: 16,
    color: Colors.dangerTextColor,
  },
});
