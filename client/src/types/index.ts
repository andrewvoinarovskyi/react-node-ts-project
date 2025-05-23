export interface Board {
  id: number;
  title: string;
  columns: Column[];
}

export type ColumnId = "todo" | "inProgress" | "done";

export const COLUMNS = [
  { id: "todo" as ColumnId, title: "To Do" },
  { id: "inProgress" as ColumnId, title: "In Progress" },
  { id: "done" as ColumnId, title: "Done" },
] as const;

export interface Column {
  id: ColumnId;
  title: string;
  cards: Card[];
}

export interface Card {
  id: number;
  boardId: number;
  title: string;
  description: string | null;
  columnId: ColumnId;
  createdAt: string;
}

export interface ServerCard {
  id: number;
  board_id: number;
  title: string;
  description: string | null;
  task_status: ColumnId;
  created_at: string;
}

export interface CreateBoardRequest {
  title: string;
}

export interface CreateCardRequest {
  title: string;
  description?: string | null;
  task_status: ColumnId;
}

export interface UpdateCardRequest {
  title?: string;
  description?: string | null;
  task_status?: ColumnId;
}

export interface DragResult {
  source: {
    droppableId: string;
    index: number;
  };
  destination?: {
    droppableId: string;
    index: number;
  };
  draggableId: string;
}
