import express from "express";
import cors from "cors";
import boardRoutes from "./routes/boardRoutes";
import cardRoutes from "./routes/cardRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/boards", boardRoutes);
app.use("/api/boards/:board_id/cards", cardRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
