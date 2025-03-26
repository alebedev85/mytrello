import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { changeColumnColor } from "../../store/boardSlice";
import { openConfirmationModal } from "../../store/popupSlice";
import { Column as ColumnType, Task } from "../../types";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import ColorPicker from "../ColorPicker/ColorPicker";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./Column.module.scss";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  index: number;
}

const Column = ({ column, tasks, index }: ColumnProps) => {
  const { theme } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Переключение состояния ColorPicker
  const toggleColorPicker = () => {
    setIsColorPickerOpen((prev) => !prev); // Переключаем состояние
  };

  // Переключение состояния isAdding
  const toggleAddTask = () => {
    setIsAdding((prev) => !prev); // Переключаем состояние
  };

  // Удаление колонки
  const handleDeleteColumn = () => {
    dispatch(
      openConfirmationModal({
        type: "column",
        targetId: { taskId: column.id, columnId: column.id },
      })
    );
  };

  // Изменение цвета колонки
  const handleColorChange = (color: string) => {
    dispatch(changeColumnColor({ columnId: column.id, color }));
    setIsColorPickerOpen(false);
  };

  return (
    <div className={`${theme === "dark" ? styles.dark : ""}`}>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={styles.column}
            style={{
              ...provided.draggableProps.style, // Объединяем стили из Draggable
              backgroundColor: column.color || undefined,
            }}
          >
            <div {...provided.dragHandleProps} className={styles.header}>
              <div className={styles.content}>
                <span>{column.title}</span>
                <div className={styles.controls}>
                  <button
                    onClick={toggleColorPicker}
                    className={`${styles.colorButton} tooltip`}
                    data-tooltip="Выбрать цвет колонки"
                  >
                    🎨
                  </button>
                  <button
                    onClick={toggleAddTask}
                    className={`${styles.addButton} tooltip`}
                    data-tooltip="Новая задача"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={handleDeleteColumn}
                    data-tooltip="Удалить колонку"
                    className={`${styles.deleteButton} tooltip`}
                  >
                    <IoClose />
                  </button>
                </div>
              </div>
              {isColorPickerOpen && (
                <div ref={colorPickerRef}>
                  <ColorPicker
                    selectedColor={column.color || "#3b82f6"}
                    onSelectColor={handleColorChange}
                  />
                </div>
              )}
            </div>

            <AddTaskForm
              isActive={isAdding}
              columnId={column.id}
              onClose={() => setIsAdding(false)}
            />

            <Droppable droppableId={column.id} type="task">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${styles.dropArea} ${
                    snapshot.isDraggingOver ? styles.isDraggingOver : ""
                  }`}
                >
                  {tasks.map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      index={index}
                      columnId={column.id}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default Column;
