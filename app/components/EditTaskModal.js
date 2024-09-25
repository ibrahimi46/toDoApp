import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

const EditTaskModal = ({ visible, onClose, onSave, taskText }) => {
  const [editedText, setEditedText] = useState(taskText);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Task</Text>
          <TextInput
            style={styles.modalInput}
            value={editedText}
            onChangeText={setEditedText}
            autoFocus
          />
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                onSave(editedText);
                onClose();
              }}
            >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    marginLeft: 10,
  },
  modalButtonText: {
    color: "#1d4ed8",
  },
});

export default EditTaskModal;
