import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";
import { AntDesign } from "@expo/vector-icons";
import PressableButton from "./PressableButton";

export default function SearchBar({
  keyword,
  setKeyword,
  placeholder,
  containerStyle,
}) {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={[styles.container, containerStyle]}>
        <FontAwesome
          name="search"
          size={20}
          color={Colors.colorYellow}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          value={keyword}
          onChangeText={(newText) => setKeyword(newText)}
          placeholder={placeholder}
          placeholderTextColor={Colors.shallowTextColor}
        />
        {keyword && (
          <PressableButton onPress={() => setKeyword("")}>
            <AntDesign
              name="closecircle"
              size={20}
              color="black"
              style={styles.clearIcon}
            />
          </PressableButton>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.colorYellow,
    borderWidth: 2,
    borderRadius: 5,
    width: 320,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    marginLeft: 5,
    paddingRight: 20,
    color: Colors.shallowTextColor,
    fontSize: 18,
    width: "80%",
  },
  searchIcon: {
    marginLeft: 10,
  },
  clearIcon: {
    marginLeft: 0,
    color: Colors.greyIconColor,
  },
});
