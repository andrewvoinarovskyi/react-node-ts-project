import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Stack, Typography } from "@mui/material";

const BoardSearch: React.FC = () => {
  const navigate = useNavigate();
  const [boardId, setBoardId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardId.trim()) return;
    navigate(`/board/${boardId.trim()}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", my: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        Enter Board ID
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          size="small"
          placeholder="Enter board ID"
          value={boardId}
          onChange={(e) => setBoardId(e.target.value)}
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            minWidth: "120px",
            height: "40px",
          }}
        >
          Load Board
        </Button>
      </Stack>
    </Box>
  );
};

export default BoardSearch;
