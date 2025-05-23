import { api } from "./api";
import { Board } from "../types";

export const boardApi = {
  createBoard: async (data: { title: string }): Promise<Board> => {
    const response = await api.post<Board>("/boards", data);
    return response.data;
  },

  getBoard: async (id: number): Promise<Board> => {
    const response = await api.get<Board>(`/boards/${id}`);
    return response.data;
  },

  updateBoard: async (
    boardId: number,
    data: { title: string },
  ): Promise<Board> => {
    const response = await api.put<Board>(`/boards/${boardId}`, data);
    return response.data;
  },

  deleteBoard: async (id: number): Promise<void> => {
    await api.delete(`/boards/${id}`);
  },
};
