const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
// const bcrypt = require('bcryptjs'); // Optional if you decide to add password later

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3001;
let leaderboard = []; // To store player scores

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle game reset logic
let gameData = {
  currentCategory: null,
  scores: {},
  items: [
    { name: 'Item 1', price: 50 },
    { name: 'Item 2', price: 120 },
    { name: 'Item 3', price: 200 },
  ]
};

// Basic authentication - For now, it's just a hardcoded user
app.use((req, res, next) => {
  // If user verification is skipped, we don't need authentication for now
  next();
});

app.get('/leaderboard', (req, res) => {
  res.json(leaderboard);
});

// WebSocket for real-time communication
io.on('connection', (socket) => {
  console.log('A player connected');

  // Handle score submission from clients
  socket.on('submit-score', (scoreData) => {
    const { player, score } = scoreData;
    gameData.scores[player] = score;

    // Update leaderboard
    leaderboard.push({ player, score });
    leaderboard.sort((a, b) => b.score - a.score); // Sort by score descending
    if (leaderboard.length > 10) leaderboard.pop(); // Keep only top 10

    io.emit('update-leaderboard', leaderboard);
  });

  // Handle game reset
  socket.on('reset-game', () => {
    gameData.scores = {}; // Reset scores
    gameData.currentCategory = null;
    io.emit('game-reset', gameData); // Notify clients
  });

  socket.on('disconnect', () => {
    console.log('A player disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
