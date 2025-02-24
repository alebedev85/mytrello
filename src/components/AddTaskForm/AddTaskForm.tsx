import { useSelector } from "react-redux";
import styles from "./AddTaskForm.module.scss";
import { RootState } from "../../store";

interface AddTaskFormProps {
  isActive: boolean;
  newTaskTitle: string;
  setNewTaskTitle: (value: string) => void;
  handleAddTask: () => void;
  onClose: () => void;
}

export default function AddTaskForm({
  isActive,
  newTaskTitle,
  setNewTaskTitle,
  handleAddTask,
  onClose,
}: AddTaskFormProps) {
  const { theme } = useSelector((state: RootState) => state.board);
  return isActive ? (
    <div className={`${styles.taskForm} ${
      theme === "dark" ? styles.dark : ""
    }`}>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Task title"
        className={styles.input}
        onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
      />
      <div className={styles.formControls}>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
        <button onClick={handleAddTask} className={styles.submitButton}>
          Add
        </button>
      </div>
    </div>
  ) : null;
}
