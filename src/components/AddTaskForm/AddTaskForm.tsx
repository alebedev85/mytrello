import styles from "./AddTaskForm.module.scss";

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
  return isActive ? (
    <div className={styles.taskForm}>
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
