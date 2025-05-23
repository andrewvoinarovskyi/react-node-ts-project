import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { createBoard } from "../features/board/boardSlice";
import { useAppDispatch } from "../storeHooks";

const CreateBoardForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const result = await dispatch(createBoard({ title: title.trim() }));
    if (createBoard.fulfilled.match(result)) {
      navigate(`/board/${result.payload.id}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", my: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create New Board
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Board Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create Board
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateBoardForm;
