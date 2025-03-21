import { db } from "../firebase";
import { BoardState } from "../types";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Функция для загрузки состояния доски из Firebase
export const loadBoardState = async (
  userId: string
): Promise<BoardState | null> => {
  const boardRef = doc(db, "boards", userId); // Получаем ссылку на документ доски для конкретного пользователя
  const docSnap = await getDoc(boardRef); // Получаем документ из Firestore

  if (docSnap.exists()) {
    // Если документ найден, возвращаем его данные
    const boardData = docSnap.data() as BoardState;

    // Проверяем, что у данных есть ключи, соответствующие `BoardState`
    if (
      boardData.columns &&
      boardData.columnOrder &&
      Array.isArray(boardData.columnOrder)
    ) {
      return boardData;
    }
  } else {
    console.log("Документ не найден для пользователя:", userId);
  }
  return null; // Если документа нет, возвращаем null
};

// Функция для сохранения состояния доски в Firebase
export const saveBoardState = async (
  userId: string,
  boardState: BoardState
) => {
  const boardRef = doc(db, "boards", userId); // Получаем ссылку на документ доски для конкретного пользователя
  try {
    await setDoc(boardRef, boardState); // Сохраняем данные доски в Firestore
    console.log("Состояние доски успешно сохранено в Firebase!");
  } catch (error) {
    console.error("Ошибка при сохранении состояния в Firebase:", error);
  }
};
