import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useAppDispatch, useAppSelector } from "../storeHooks";
import {
  getBoard,
  updateBoard,
  deleteBoard,
} from "../features/board/boardSlice";
import { fetchCards, moveCard } from "../features/card/cardSlice";
import { COLUMNS, Card, ColumnId } from "../types";
import Column from "./Column";

const BoardView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    currentBoard,
    loading: boardLoading,
    error: boardError,
  } = useAppSelector((state) => state.board);
  const {
    items: cards,
    loading: cardLoading,
    error: cardError,
  } = useAppSelector((state) => state.card);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (currentBoard) {
      setEditedTitle(currentBoard.title);
    }
  }, [currentBoard]);

  useEffect(() => {
    if (id) {
      dispatch(getBoard(Number(id)));
      dispatch(fetchCards(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!boardLoading && (boardError || (!currentBoard && id))) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [boardLoading, boardError, currentBoard, id, navigate]);

  const columns = useMemo(() => {
    return COLUMNS.map((column) => ({
      ...column,
      cards: cards.filter((card: Card) => card.columnId === column.id),
    }));
  }, [cards]);

  const handleDragEnd = (result: DropResult) => {
    if (!currentBoard) return;

    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const cardId = Number(draggableId);
    const card = cards.find((c: Card) => c.id === cardId);
    if (!card) return;

    if (!["todo", "inProgress", "done"].includes(destination.droppableId)) {
      console.error("Invalid column ID:", destination.droppableId);
      return;
    }

    dispatch(
      moveCard({
        boardId: currentBoard.id,
        cardId,
        data: {
          title: card.title,
          description: card.description,
          columnId: destination.droppableId as ColumnId,
        },
      }),
    );
  };

  const handleTitleSave = () => {
    if (id && editedTitle.trim() !== currentBoard?.title) {
      dispatch(
        updateBoard({
          boardId: Number(id),
          title: editedTitle.trim(),
        }),
      );
    }
    setIsEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setEditedTitle(currentBoard?.title || "");
    setIsEditingTitle(false);
  };

  const handleDeleteBoard = () => {
    if (id) {
      dispatch(deleteBoard(Number(id)));
      navigate("/");
    }
  };

  if (boardLoading || cardLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (boardError || cardError) {
    return (
      <Box p={2}>
        <Alert severity="error">
          {boardError || cardError}
          <Typography variant="body2" sx={{ mt: 1 }}>
            Redirecting to home page...
          </Typography>
        </Alert>
      </Box>
    );
  }

  if (!currentBoard) {
    return (
      <Box p={2}>
        <Alert severity="info">
          Board not found
          <Typography variant="body2" sx={{ mt: 1 }}>
            Redirecting to home page...
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box>
        <Box display="flex" alignItems="center" mb={2}>
          {isEditingTitle ? (
            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                variant="standard"
                autoFocus
                sx={{ fontSize: "h4.fontSize" }}
              />
              <IconButton
                onClick={handleTitleSave}
                color="primary"
                size="small"
              >
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleTitleCancel} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h4">{currentBoard.title}</Typography>
              <IconButton onClick={() => setIsEditingTitle(true)} size="small">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => setDeleteDialogOpen(true)}
                size="small"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          gap={2}
          sx={{
            p: 2,
            width: "fit-content",
            minWidth: "100%",
          }}
        >
          {columns.map((column) => (
            <Column key={column.id} column={column} boardId={currentBoard.id} />
          ))}
        </Box>
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Board</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete "{currentBoard.title}"? This
              action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleDeleteBoard}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DragDropContext>
  );
};

export default BoardView;
