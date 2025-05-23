import React, { useState } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";
import { createCard } from "../features/card/cardSlice";
import { useAppDispatch } from "../storeHooks";

interface Props {
  boardId: number;
  columnId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateCardForm: React.FC<Props> = ({
  boardId,
  columnId,
  onCancel,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await dispatch(
      createCard({
        boardId,
        data: {
          title: title.trim(),
          description: description.trim() || null,
          columnId,
        },
      }),
    );

    setTitle("");
    setDescription("");
    onSuccess();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          autoFocus
          size="small"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          size="small"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add
          </Button>
          <Button variant="outlined" onClick={onCancel} fullWidth>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreateCardForm;
