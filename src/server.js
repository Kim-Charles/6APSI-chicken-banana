const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://172.18.0.222:3000",
    methods: ["GET", "POST"]
  }
});

let gameState = {
  revealed: Array(36).fill(false),
  board: generateRandomBoard(),
};

function generateRandomBoard() {
  const board = [];
  for (let i = 0; i < 36; i++) {
    board.push(Math.random() < 0.5 ? "banana" : "chicken");
  }
  return board;
}

io.on("connection", (socket) => {
  console.log("New client connected");

  // Send current game state to new client
  socket.emit("gameState", gameState);

  // When a client reveals a tile
  socket.on("revealTile", (index) => {
    if (!gameState.revealed[index]) {
      gameState.revealed[index] = true;

      // Broadcast the updated game state to all clients
      io.emit("gameState", gameState);
    }
  });

  // When a client wants to reset the game
  socket.on("resetGame", () => {
    gameState = {
      board: generateRandomBoard(),
      revealed: Array(36).fill(false),
    };
    io.emit("gameState", gameState);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
