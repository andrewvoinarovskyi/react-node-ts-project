import { pool } from "../db";
import { Board } from "../types/board";

export const getBoard = async (id: number): Promise<Board> => {
  const result = await pool.query<Board>(
    "SELECT id, title FROM boards WHERE id = $1",
    [id],
  );
  return result.rows[0];
};

export const createBoard = async (title: string): Promise<Board> => {
  const result = await pool.query<Board>(
    "INSERT INTO boards (title) VALUES ($1) RETURNING id, title",
    [title],
  );
  return result.rows[0];
};

export const updateBoard = async (
  id: number,
  title: string,
): Promise<Board | null> => {
  const result = await pool.query<Board>(
    "UPDATE boards SET title = $1 WHERE id = $2 RETURNING id, title",
    [title, id],
  );
  return result.rows[0] || null;
};

export const deleteBoard = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM boards WHERE id = $1", [id]);
};
