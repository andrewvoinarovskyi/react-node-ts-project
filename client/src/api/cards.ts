import { api } from "./api";
import { Card, ServerCard } from "../types";

const transformServerCard = (card: ServerCard): Card => ({
  id: card.id,
  boardId: card.board_id,
  title: card.title,
  description: card.description,
  columnId: card.task_status,
  createdAt: card.created_at,
});

const transformCreateRequest = (
  boardId: number,
  data: { title: string; description?: string | null; columnId: string },
) => ({
  title: data.title,
  description: data.description,
  task_status: data.columnId,
});

const transformUpdateRequest = (data: {
  title?: string;
  description?: string | null;
  columnId?: string;
}) => {
  const request: {
    title?: string;
    description?: string | null;
    task_status?: string;
  } = {};

  request.title = data.title;
  request.description = data.description;
  request.task_status = data.columnId;

  return request;
};

export const cardApi = {
  getCards: async (boardId: number): Promise<Card[]> => {
    const response = await api.get<ServerCard[]>(`/boards/${boardId}/cards`);
    return response.data.map(transformServerCard);
  },

  createCard: async (
    boardId: number,
    data: { title: string; description?: string | null; columnId: string },
  ): Promise<Card> => {
    const response = await api.post<ServerCard>(
      `/boards/${boardId}/cards`,
      transformCreateRequest(boardId, data),
    );
    return transformServerCard(response.data);
  },

  updateCard: async (
    boardId: number,
    cardId: number,
    data: { title?: string; description?: string | null; columnId?: string },
  ): Promise<Card> => {
    const response = await api.put<ServerCard>(
      `/boards/${boardId}/cards/${cardId}`,
      transformUpdateRequest(data),
    );
    return transformServerCard(response.data);
  },

  moveCard: async (
    boardId: number,
    cardId: number,
    data: { title?: string; description?: string | null; columnId?: string },
  ): Promise<Card> => {
    const response = await api.put<ServerCard>(
      `/boards/${boardId}/cards/${cardId}`,
      transformUpdateRequest(data),
    );
    return transformServerCard(response.data);
  },

  deleteCard: async (boardId: number, cardId: number): Promise<void> => {
    await api.delete(`/boards/${boardId}/cards/${cardId}`);
  },
};
