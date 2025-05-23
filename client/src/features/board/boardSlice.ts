import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Board } from "../../types";
import { boardApi } from "../../api/boards";

interface BoardState {
  currentBoard: Board | null;
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  currentBoard: null,
  loading: false,
  error: null,
};

export const createBoard = createAsyncThunk(
  "board/createBoard",
  async (data: { title: string }) => {
    return await boardApi.createBoard(data);
  },
);

export const getBoard = createAsyncThunk(
  "board/getBoard",
  async (id: number) => {
    return await boardApi.getBoard(id);
  },
);

export const updateBoard = createAsyncThunk(
  "board/updateBoard",
  async ({ boardId, title }: { boardId: number; title: string }) => {
    return await boardApi.updateBoard(boardId, { title });
  },
);

export const deleteBoard = createAsyncThunk(
  "board/deleteBoard",
  async (id: number) => {
    await boardApi.deleteBoard(id);
    return id;
  },
);

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create board";
      })
      .addCase(getBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addCase(getBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch board";
      })
      .addCase(updateBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update board";
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.currentBoard = null;
      });
  },
});

export default boardSlice.reducer;
