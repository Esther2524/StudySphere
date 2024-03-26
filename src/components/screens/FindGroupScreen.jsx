import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../utils/Colors";
import SearchBar from "../ui/SearchBar";
import GroupResultsList from "../features/findGroup/GroupResultsList";

export default function FindGroupScreen() {
  const [keyword, setKeyword] = useState("");

  return (
    <View style={styles.container}>
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        placeholder="Search a group"
      />
      <GroupResultsList keyword={keyword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    flex: 1,
  },
});
