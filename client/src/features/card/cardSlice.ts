import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Card } from "../../types";
import { cardApi } from "../../api/cards";

interface CardState {
  items: Card[];
  loading: boolean;
  error: string | null;
}

const initialState: CardState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCards = createAsyncThunk(
  "card/fetchCards",
  async (boardId: number) => {
    return await cardApi.getCards(boardId);
  },
);

export const createCard = createAsyncThunk(
  "card/createCard",
  async ({
    boardId,
    data,
  }: {
    boardId: number;
    data: { title: string; description?: string | null; columnId: string };
  }) => {
    return await cardApi.createCard(boardId, data);
  },
);

export const updateCard = createAsyncThunk(
  "card/updateCard",
  async ({
    boardId,
    cardId,
    data,
  }: {
    boardId: number;
    cardId: number;
    data: { title?: string; description?: string | null; columnId?: string };
  }) => {
    return await cardApi.updateCard(boardId, cardId, data);
  },
);

export const moveCard = createAsyncThunk(
  "card/moveCard",
  async ({
    boardId,
    cardId,
    data,
  }: {
    boardId: number;
    cardId: number;
    data: { title: string; description: string | null; columnId: string };
  }) => {
    return await cardApi.moveCard(boardId, cardId, data);
  },
);

export const deleteCard = createAsyncThunk(
  "card/deleteCard",
  async ({ boardId, cardId }: { boardId: number; cardId: number }) => {
    await cardApi.deleteCard(boardId, cardId);
    return cardId;
  },
);

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cards";
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (card) => card.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (card) => card.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (card) => card.id !== Number(action.payload),
        );
      });
  },
});

export default cardSlice.reducer;
