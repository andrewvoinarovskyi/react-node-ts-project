import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./features/board/boardSlice";
import cardReducer from "./features/card/cardSlice";

export const store = configureStore({
  reducer: { board: boardReducer, card: cardReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
