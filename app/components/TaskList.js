import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ task, onDelete, onEdit, onToggle, darkMode }) => {
  return (
    <TaskItem
      task={task}
      onDelete={onDelete}
      onEdit={onEdit}
      onToggle={onToggle}
      darkMode={darkMode}
    />
  );
};

export default TaskList;
