const socket = io();

// Listen for leaderboard updates
socket.on('update-leaderboard', (leaderboard) => {
  const leaderboardList = document.getElementById('leaderboard-list');
  leaderboardList.innerHTML = ''; // Clear previous list
  leaderboard.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = `${entry.player}: ${entry.score}`;
    leaderboardList.appendChild(li);
  });
});

// Listen for game reset
socket.on('game-reset', (gameData) => {
  document.getElementById('category-name').textContent = `Current Category: None`;
  updateScores(gameData.scores);
});

// Button to reset the game
document.getElementById('reset-button').addEventListener('click', () => {
  socket.emit('reset-game');
});

// Update the scores list
function updateScores(scores) {
  const scoreList = document.getElementById('score-list');
  scoreList.innerHTML = ''; // Clear previous scores
  for (const player in scores) {
    const li = document.createElement('li');
    li.textContent = `${player}: ${scores[player]}`;
    scoreList.appendChild(li);
  }
}
