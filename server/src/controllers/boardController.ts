import { Request, Response } from "express";
import * as Board from "../models/board";

const handleError = (res: Response, error: unknown) => {
  res.status(500).json({ message: "Server error" });
  console.error(error);
};

export const getBoard = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid board ID" });
    }
    const board = await Board.getBoard(id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json(board);
  } catch (error) {
    handleError(res, error);
  }
};

export const createBoard = async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  try {
    res.status(201).json(await Board.createBoard(title));
  } catch (error) {
    handleError(res, error);
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title } = req.body;
    if (isNaN(id) || !title)
      return res.status(400).json({ message: "Invalid input" });
    const updated = await Board.updateBoard(id, title);
    if (!updated) return res.status(404).json({ message: "Board not found" });
    res.json(updated);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Board.deleteBoard(Number(id));
    res.sendStatus(204);
  } catch (error) {
    handleError(res, error);
  }
};
