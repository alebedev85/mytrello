import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addTask } from "../../store/boardSlice";
import { Priority, Task } from "../../types";
import CustomSelect from "../ui/CustomSelect/CustomSelect";

import styles from "./AddTaskForm.module.scss";

interface AddTaskFormProps {
  isActive: boolean;
  columnId: string;
  onClose: () => void;
}

const AddTaskForm = ({ isActive, columnId, onClose }: AddTaskFormProps) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.board);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("none");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: newTaskTitle,
        description: "",
        priority: priority,
      };
      dispatch(addTask({ columnId, task: newTask }));
      setNewTaskTitle("");
      setPriority("none");
      onClose();
    }
  };
  return isActive ? (
    <div
      className={`${styles.taskForm} ${theme === "dark" ? styles.dark : ""}`}
    >
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Task title"
        className={styles.input}
        onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
      />
      <CustomSelect
        onSelect={(value) => setPriority(value)}
        selected={priority}
      />
      <div className={styles.formControls}>
        <button onClick={handleAddTask} className={styles.submitButton}>
          Добавить
        </button>
        <button onClick={onClose} className={styles.cancelButton}>
          Отмена
        </button>
      </div>
    </div>
  ) : null;
};

export default AddTaskForm;
