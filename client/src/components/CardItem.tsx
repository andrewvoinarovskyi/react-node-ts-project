import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Card as CardType } from "../types";
import { updateCard, deleteCard } from "../features/card/cardSlice";
import { useAppDispatch } from "../storeHooks";

interface Props {
  card: CardType;
  index: number;
  boardId: number;
}

const CardItem: React.FC<Props> = ({ card, index, boardId }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");

  const handleSave = () => {
    if (!title.trim()) return;

    dispatch(
      updateCard({
        boardId,
        cardId: card.id,
        data: {
          title: title.trim(),
          description: description.trim() || null,
          columnId: card.columnId,
        },
      }),
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteCard({ boardId, cardId: card.id }));
    setIsDeleting(false);
  };

  return (
    <>
      <Draggable draggableId={String(card.id)} index={index}>
        {(provided, snapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              mb: 1,
              backgroundColor: snapshot.isDragging
                ? "action.hover"
                : "background.paper",
              cursor: "grab",
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "1rem" }}
                >
                  {card.title}
                </Typography>
                <Box>
                  <IconButton size="small" onClick={() => setIsEditing(true)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setIsDeleting(true)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              {card.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {card.description}
                </Typography>
              )}
            </CardContent>
          </Card>
        )}
      </Draggable>

      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Card</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!title.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleting} onClose={() => setIsDeleting(false)}>
        <DialogTitle>Delete Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{card.title}"? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardItem;
