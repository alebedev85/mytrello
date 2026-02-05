import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import Board from "../../components/Board/Board";
import { moveColumn, moveTask } from "../../store/boardSlice";

const Main = () => {
  const dispatch = useDispatch();

  // Функция, вызываемая при завершении перетаскивания
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // Если элемент перетаскивали, но не отпустили в допустимой зоне, выходим
    if (!destination) return;

    // Если элемент остался на том же месте, где был, выходим
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Обработка перемещения колонок
    if (type === "column") {
      dispatch(
        moveColumn({
          sourceIndex: source.index, // Исходная позиция колонки
          destIndex: destination.index, // Новая позиция колонки
        })
      );
      return;
    }

    // Обработка перемещения задач между колонками
    if (type === "task") {
      dispatch(
        moveTask({
          sourceColId: source.droppableId, // ID колонки, откуда задача была взят
          destColId: destination.droppableId, // ID колонки, куда задача перемещается
          sourceIndex: source.index, // Исходный индекс в колонке
          destIndex: destination.index, // Новый индекс в колонке
          taskId: draggableId, // ID перетаскиваемой задачи
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Board />
    </DragDropContext>
  );
};

export default Main;
