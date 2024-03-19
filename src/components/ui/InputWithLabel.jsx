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
  style,
}) {
  const optionalProps = editable
    ? { onChangeText: (newContent) => setContent(newContent) }
    : { onFocus: () => Keyboard.dismiss() };

  return (
    <View style={[{ ...styles.container, zIndex: zIndex }, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {inputType === "text" && (
        <TextInput
          value={content + ""}
          {...optionalProps}
          style={styles.textInput}
          onPressIn={onPressIn}
          placeholder={placeholder}
          inputMode={inputMode}
        />
      )}
      {inputType === "other" && children}
      <Text style={styles.error}>{errorMsg}</Text>
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
    marginVertical: 5,
    color: Colors.mainText,
  },
  label: {
    fontSize: 16,
    paddingHorizontal: 5,
    fontWeight: "bold",
    color: Colors.inputLabelColor,
  },
  error: {
    paddingHorizontal: 5,
    fontSize: 16,
    color: Colors.dangerTextColor,
  },
});
