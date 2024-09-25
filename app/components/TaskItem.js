import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const TaskItem = React.memo(
  ({ task, onDelete, onEdit, onToggle, darkMode }) => (
    <TouchableOpacity
      style={[
        styles.taskContainer,
        darkMode
          ? { backgroundColor: "#2D3748" }
          : { backgroundColor: "#dae0e8" },
      ]}
      onPress={() => onToggle(task.id)}
    >
      <View style={styles.taskContent}>
        <Text
          style={[
            styles.taskText,
            task.completed && styles.completedTask,
            darkMode ? { color: "white" } : { color: "black" },
          ]}
        >
          {task.text}
        </Text>
        <View style={styles.taskActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onEdit(task.id)}
          >
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onDelete(task.id)}
          >
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
);

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: "#f1f5f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskText: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#808080",
  },
  taskActions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 10,
  },
  actionText: {
    color: "#1d4ed8",
  },
});

export default TaskItem;
