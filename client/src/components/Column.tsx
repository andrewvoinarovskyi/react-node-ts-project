import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Box, Paper, Typography, Button } from "@mui/material";
import { Column as ColumnType } from "../types";
import CardItem from "./CardItem";
import CreateCardForm from "./CreateCardForm";

interface Props {
  column: ColumnType;
  boardId: number;
}

const Column: React.FC<Props> = ({ column, boardId }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        minWidth: 280,
        maxWidth: 280,
        height: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.100",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {column.title}
      </Typography>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              flex: 1,
              borderRadius: 1,
              p: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              {column.cards.map((card, index) => (
                <CardItem
                  key={card.id}
                  card={card}
                  index={index}
                  boardId={boardId}
                />
              ))}
            </Box>
            {provided.placeholder}
            {column.id === "todo" &&
              (isAddingCard ? (
                <CreateCardForm
                  boardId={boardId}
                  columnId={column.id}
                  onCancel={() => setIsAddingCard(false)}
                  onSuccess={() => setIsAddingCard(false)}
                />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setIsAddingCard(true)}
                  sx={{ mt: 1 }}
                >
                  Add Card
                </Button>
              ))}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};

export default Column;
