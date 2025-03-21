import { useEffect } from "react";
import { store } from "../store";
import { saveBoardState } from "../utils/storageFirebase";

const useSaveBoardState = (userId: string | undefined) => {
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = store.subscribe(() => {
      const boardState = store.getState().board;
      saveBoardState(userId, boardState); // Сохраняем состояние в Firebase
    });

    return () => unsubscribe(); // Очистка подписки при размонтировании
  }, [userId]);
};

export default useSaveBoardState;
