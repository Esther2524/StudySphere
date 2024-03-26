import { View, Text, StyleSheet, FlatList } from "react-native";
import GroupResultsItem from "./GroupResultsItem";
import { Colors } from "../../../utils/Colors";
import useSearchGroup from "./useSearchGroup";

export default function GroupResultsList({ keyword }) {
  const { data: groupData, isPending: isSearching } = useSearchGroup(keyword);

  if (isSearching) return <Text>Searching...</Text>;

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
              joined={item.joined}
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
