import { View, Text, StyleSheet, FlatList } from "react-native";
import GroupResultsItem from "./GroupResultsItem";
import { Colors } from "../../../utils/Colors";
import useSearchGroup from "./useSearchGroup";
import LottieView from "lottie-react-native";

export default function GroupResultsList({ keyword }) {
  const { data: groupData, isPending: isSearching } = useSearchGroup(keyword);

  return (
    <View style={styles.container}>
      {((groupData && groupData.length > 0) || isSearching) && (
        <Text style={styles.listTitle}>Results</Text>
      )}
      {!keyword && (
        <View style={styles.placeholderContainer}>
          <LottieView
            source={require("../../../../assets/placeholder-FindGroup.json")}
            style={{ width: "100%", height: "100%" }}
            autoPlay
            loop={false}
          />
          <Text style={styles.placeholderText}>
            Input group's name to find groups
          </Text>
        </View>
      )}
      {isSearching &&
        keyword &&
        Array.from({ length: 4 }).map((_, index) => (
          <GroupResultsItem key={index} isLoading={true} />
        ))}
      {!isSearching && groupData && groupData.length > 0 && (
        <FlatList
          data={groupData}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <GroupResultsItem
              groupId={item.groupId}
              groupName={item.groupName}
              groupSize={item.groupSize}
              joined={item.joined}
            />
          )}
          style={{ marginBottom: 100 }}
        />
      )}
      {keyword && !isSearching && groupData && groupData.length === 0 && (
        <View style={styles.placeholderContainer}>
          <LottieView
            source={require("../../../../assets/placeholder-FindGroup.json")}
            style={{ width: "100%", height: "100%" }}
            autoPlay={false}
            loop={false}
          />
          <Text style={styles.placeholderText}>
            No result found for "{keyword}"
          </Text>
        </View>
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
  placeholderContainer: {
    marginTop: 100,
    height: 250,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: Colors.shallowTextColor,
    fontSize: 16,
    marginTop: -60,
  },
});
