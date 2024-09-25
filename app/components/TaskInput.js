import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const TaskInput = ({ newTask, setNewTask, addTask, darkMode }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        placeholder="Add a new task"
        placeholderTextColor={darkMode ? "#A0AEC0" : "#808080"}
        value={newTask}
        onChangeText={setNewTask}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
  },
  darkInput: {
    backgroundColor: "#2d3748",
    color: "white",
  },
  addButton: {
    backgroundColor: "#1d4ed8",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TaskInput;
