import React from "react";
import { Routes, Route, Navigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";
import BoardSearch from "./components/BoardSearch";
import CreateBoardForm from "./components/CreateBoardForm";
import BoardView from "./components/BoardView";

const App: React.FC = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Link
          component={RouterLink}
          to="/"
          sx={{
            color: "inherit",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          <Typography variant="h6" component="div">
            Task Board
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
    <Container maxWidth="lg">
      <Box py={4}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BoardSearch />
                <CreateBoardForm />
              </>
            }
          />
          <Route
            path="/board/:id"
            element={
              <>
                <BoardSearch />
                <BoardView />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Container>
  </>
);

export default App;
