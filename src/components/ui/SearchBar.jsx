import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";

export default function SearchBar({ setKeyword, placeholder, containerStyle }) {
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
          onChangeText={(text) => setKeyword(text)}
          placeholder={placeholder}
          placeholderTextColor={Colors.shallowTextColor}
        />
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
    color: Colors.shallowTextColor,
    fontSize: 18,
    width: "85%",
  },
  searchIcon: {
    marginLeft: 10,
  },
});
