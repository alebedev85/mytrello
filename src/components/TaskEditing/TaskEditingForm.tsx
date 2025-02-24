import { useState } from "react";
import styles from "./TaskEditingForm.module.scss";
import { updateTask } from "../../store/boardSlice";
import { Task } from "../../types";
import { useDispatch } from "react-redux";

interface TaskEditingFormProps {
  task: Task;
  onClose: () => void;
}

export default function TaskEditingForm({
  task,
  onClose,
}: TaskEditingFormProps) {
  const dispatch = useDispatch();
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    if (editedTitle.trim()) {
      dispatch(
        updateTask({
          ...task,
          title: editedTitle,
          description: editedDescription,
        })
      );
      onClose();
    }
  };
  return (
    <div className={styles.form}>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        className={styles.input}
        placeholder="Task title"
      />
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        className={styles.textarea}
        placeholder="Description"
        rows={3}
      />
      <div className={styles.formControls}>
        <button className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
        <button onClick={handleSave} className={styles.submitButton}>
          Save
        </button>
      </div>
    </div>
  );
}
