import { useDispatch } from "react-redux";
import { addBudgetEntry } from "./components/budgetActions";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";

export default function Root({ navigation }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [plannedAmount, setPlannedAmount] = useState("");
  const [actualAmount, setActualAmount] = useState("");

  const saveBudgetEntry = () => {
    if (name && plannedAmount && actualAmount) {
      const entry = {
        key: Math.random().toString(),
        name: name,
        plannedAmount: plannedAmount,
        actualAmount: actualAmount,
      };
      dispatch(addBudgetEntry(entry));
      setName("");
      setPlannedAmount("");
      setActualAmount("");
      Alert.alert('Success', 'Item has been added to the list Successfully!', [
        {text: 'Okay'}
      ])
    }else{
      Alert.alert('Attention', 'No Empty Field allowed!', [
        {text: 'Okay'}
      ])
    }
  };

  const navigating = () => {
    navigation.push("BudgetList");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Item Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Name of the item"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Planned Amount"
        keyboardType="numeric"
        value={plannedAmount}
        onChangeText={setPlannedAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Actual Amount"
        keyboardType="numeric"
        value={actualAmount}
        onChangeText={setActualAmount}
      />
      <Pressable style={styles.button} onPress={saveBudgetEntry}>
        <Text style={styles.text}>Save Entry</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={navigating}>
        <Text style={styles.text}>Show all Entries</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'skyblue',
    marginTop: 10
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "skyblue",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
  },
});
