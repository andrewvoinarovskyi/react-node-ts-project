export type TaskStatus = "todo" | "inProgress" | "done";

export interface Card {
  id: number;
  board_id: number;
  title: string;
  description: string | null;
  task_status: TaskStatus;
  created_at: Date;
}
