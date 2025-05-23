CREATE TABLE IF NOT EXISTS boards (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cards (
  id SERIAL PRIMARY KEY,
  board_id INTEGER REFERENCES boards(id) ON DELETE CASCADE,
  column TEXT CHECK (column IN ('todo', 'inProgress', 'done')) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  position INTEGER NOT NULL
);