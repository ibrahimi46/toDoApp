import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Switch,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskList from "./app/components/TaskList";
import TaskInput from "./app/components/TaskInput";
import SearchBar from "./app/components/SearchBar";
import EditTaskModal from "./app/components/EditTaskModal";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadTasks = useCallback(async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks !== null) {
        const parsedTasks = JSON.parse(storedTasks);
        const validTasks = parsedTasks.filter((task) => task && task.id);
        setTasks(validTasks);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }, []);

  const saveTasks = useCallback(async (newTasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }, []);

  const addTask = useCallback(() => {
    if (newTask.trim() !== "") {
      const newTaskItem = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
      };
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTaskItem];
        saveTasks(updatedTasks);
        return updatedTasks;
      });
      setNewTask("");
    }
  }, [newTask, saveTasks]);

  const deleteTask = useCallback(
    (id) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== id);
        saveTasks(updatedTasks);
        return updatedTasks;
      });
    },
    [saveTasks]
  );

  const editTask = useCallback(
    (id) => {
      const taskToEdit = tasks.find((task) => task.id === id);
      if (taskToEdit) {
        setEditingTask(taskToEdit);
        setModalVisible(true);
      }
    },
    [tasks]
  );

  const updateTask = useCallback(
    (newText) => {
      if (editingTask) {
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.map((task) =>
            task.id === editingTask.id ? { ...task, text: newText } : task
          );
          saveTasks(updatedTasks);
          return updatedTasks;
        });
        setEditingTask(null);
      }
    },
    [editingTask, saveTasks]
  );

  const toggleTask = useCallback(
    (id) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks(updatedTasks);
        return updatedTasks;
      });
    },
    [saveTasks]
  );

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, darkMode && styles.darkText]}>
            To-Do List
          </Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
            style={styles.toggle}
          />
        </View>
        <TaskInput
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
          darkMode={darkMode}
        />
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
        />
        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => (
            <TaskList
              key={item.id}
              task={item}
              onDelete={deleteTask}
              onEdit={editTask}
              onToggle={toggleTask}
              darkMode={darkMode}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        {editingTask && (
          <EditTaskModal
            visible={modalVisible}
            onClose={() => {
              setModalVisible(false);
              setEditingTask(null);
            }}
            onSave={updateTask}
            taskText={editingTask.text}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#1a202c",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
  toggle: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});

export default App;
