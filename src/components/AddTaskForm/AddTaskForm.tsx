import { useDispatch, useSelector } from "react-redux";
import styles from "./AddTaskForm.module.scss";
import { RootState } from "../../store";
import { useState } from "react";
import { Priority, Task } from "../../types";
import { addTask } from "../../store/boardSlice";

interface AddTaskFormProps {
  isActive: boolean;
  columnId: string;
  onClose: () => void;
}

export default function AddTaskForm({
  isActive,
  columnId,
  onClose,
}: AddTaskFormProps) {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.board);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

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
      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as Priority)
        }
        className={styles.select}
      >
        <option value="high">Высокий</option>
        <option value="medium">Средний</option>
        <option value="low">Низкий</option>
      </select>
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
}
