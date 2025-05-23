import { pool } from "../db";
import { Card } from "../types/card";

export const getCards = async (boardId: number): Promise<Card[]> => {
  const result = await pool.query<Card>(
    `SELECT id, board_id, title, task_status, description
     FROM cards
     WHERE board_id = $1`,
    [boardId],
  );
  return result.rows;
};

export const createCard = async (
  board_id: number,
  task_status: Card["task_status"],
  title: string,
  description: string | null,
): Promise<Card> => {
  const result = await pool.query<Card>(
    `INSERT INTO cards (board_id, task_status, title, description)
     VALUES ($1, $2, $3, $4)
     RETURNING id, board_id, task_status, title, description`,
    [board_id, task_status, title, description],
  );
  return result.rows[0];
};

export const updateCard = async (
  id: number,
  task_status: Card["task_status"],
  title: string,
  description: string | null,
): Promise<Card> => {
  const result = await pool.query<Card>(
    `UPDATE cards SET task_status = $1, title = $2, description = $3
     WHERE id = $4
     RETURNING id, board_id, task_status, title, description`,
    [task_status, title, description, id],
  );
  return result.rows[0];
};

export const deleteCard = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM cards WHERE id = $1", [id]);
};
