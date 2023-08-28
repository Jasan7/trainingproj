import React from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeBudgetEntry } from "../components/budgetActions";

export default function BudgetList() {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>
          {" "}
          Item Name: <Text style={styles.itemText}>{item.name}</Text>
        </Text>
        <Text style={styles.title}>
          {" "}
          Planned Amount:{" "}
          <Text style={styles.itemText}>{item.plannedAmount}</Text>
        </Text>
        <Text style={styles.title}>
          {" "}
          Actual Amount:{" "}
          <Text style={styles.itemText}>{item.actualAmount}</Text>
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => dispatch(removeBudgetEntry(item.key))}
        >
          <Text style={styles.text}>Remove Item</Text>
        </Pressable>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {items.length == 0 ? (
        <View style={styles.list}>
        <Text>No Items to show</Text>
      </View>
      ) : (
      <View style={styles.list}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
    color: "skyblue",
    letterSpacing: 0.25,
  },
  list: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  itemContainer: {
    flex: 1,
    padding: 16,
    marginTop: 16,
    borderColor: "skyblue",
    borderWidth: 3,
    borderStyle: "dashed",
    borderRadius: 10,
    width: 255,
    backgroundColor: "black",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "skyblue",
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
