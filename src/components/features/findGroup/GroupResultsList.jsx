import { View, Text, StyleSheet, FlatList } from "react-native";
import GroupResultsItem from "./GroupResultsItem";
import { Colors } from "../../../utils/Colors";
import { useEffect, useState } from "react";
import { searchGroup } from "./findGroupHelper";

export default function GroupResultsList({ keyword }) {
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    const handlerSearch = async () => {
      const data = await searchGroup(keyword);
      setGroupData(data);
    };
    if (keyword) handlerSearch();
    else setGroupData([]);
  }, [keyword, searchGroup]);

  return (
    <View style={styles.container}>
      {groupData.length > 0 && <Text style={styles.listTitle}>Results</Text>}
      {groupData.length > 0 && (
        <FlatList
          data={groupData}
          renderItem={({ item }) => (
            <GroupResultsItem
              groupId={item.groupId}
              groupName={item.groupName}
              groupSize={item.groupSize}
            />
          )}
          style={{ marginBottom: 150 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  listTitle: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 15,
    color: Colors.shallowTextColor,
  },
});
