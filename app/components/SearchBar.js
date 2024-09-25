import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

const SearchBar = ({ searchQuery, setSearchQuery, darkMode }) => {
  return (
    <View>
      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        placeholder="Search tasks"
        placeholderTextColor={darkMode ? "#A0AEC0" : "#808080"}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  darkInput: {
    backgroundColor: "#2d3748",
    color: "white",
  },
});

export default SearchBar;
