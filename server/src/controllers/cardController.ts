import { Request, Response } from "express";
import * as Card from "../models/card";

const handleError = (res: Response, error: unknown) => {
  console.error(error);
  res.status(500).json({ message: "Server error" });
};

export const getCards = async (req: Request, res: Response) => {
  try {
    const board_id = Number(req.params.board_id);
    if (isNaN(board_id))
      return res.status(400).json({ message: "Invalid board ID" });
    res.json(await Card.getCards(board_id));
  } catch (error) {
    handleError(res, error);
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const { task_status, title, description } = req.body;
    const board_id = Number(req.params.board_id);

    if (isNaN(board_id) || !title || !task_status)
      return res.status(400).json({ message: "Missing required fields" });
    if (!["todo", "inProgress", "done"].includes(task_status))
      return res.status(400).json({ message: "Invalid task status" });

    const newCard = await Card.createCard(
      board_id,
      task_status,
      title,
      description ?? null,
    );
    res.status(201).json(newCard);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateCard = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { task_status, title, description } = req.body;

    if (isNaN(id)) return res.status(400).json({ message: "Invalid card ID" });

    if (task_status && !["todo", "inProgress", "done"].includes(task_status))
      return res.status(400).json({ message: "Invalid task status" });

    const updated = await Card.updateCard(
      id,
      task_status,
      title,
      description ?? null,
    );
    if (!updated) return res.status(404).json({ message: "Card not found" });
    res.json(updated);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid card ID" });
    await Card.deleteCard(id);
    res.sendStatus(204);
  } catch (error) {
    handleError(res, error);
  }
};
