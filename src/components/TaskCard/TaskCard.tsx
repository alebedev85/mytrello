import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { Task } from '../../types';
import { updateTask } from '../../store/boardSlice';
import { FaEdit } from 'react-icons/fa';
import styles from './TaskCard.module.scss';

interface Props {
  task: Task;
  index: number;
}

const TaskCard: React.FC<Props> = ({ task, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
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
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${styles.task} ${snapshot.isDragging ? styles.isDragging : ''}`}
        >
          {isEditing ? (
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
                <button
                  onClick={() => setIsEditing(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className={styles.submitButton}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.header}>
                <h3 className={styles.title}>{task.title}</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className={styles.editButton}
                >
                  <FaEdit />
                </button>
              </div>
              {task.description && (
                <p className={styles.description}>{task.description}</p>
              )}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;