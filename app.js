const players = [];
let currentQuestionIndex = 0;
let gameData = []; // Stores player guesses, scores, etc.

// Initialize
document.getElementById('lock-guess').addEventListener('click', lockGuess);
document.getElementById('reveal-answers').addEventListener('click', revealAnswers);
document.getElementById('reset-game').addEventListener('click', resetGame);

function lockGuess() {
  const playerGuess = document.getElementById('player-guess').value;

  if (!playerGuess) {
    alert('Please enter a guess!');
    return;
  }

  // Update player's guess in the game data
  const playerName = prompt('Enter your name:'); // This is basic, but can be improved
  const player = players.find(p => p.name === playerName);

  if (player) {
    player.guess = playerGuess;
  } else {
    players.push({ name: playerName, guess: playerGuess, score: 0 });
  }

  // Update the scoreboard
  updateScoreboard();
}

function updateScoreboard() {
  const playerList = document.getElementById('players-list');
  playerList.innerHTML = '';

  players.forEach(player => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${player.name}</td><td>${player.score}</td><td>${player.guess}</td>`;
    playerList.appendChild(row);
  });
}

function revealAnswers() {
  // Here we should compare guesses and determine who won
  const correctAnswer = 200; // Example value; replace with actual game logic

  players.forEach(player => {
    const guess = parseFloat(player.guess);
    if (guess <= correctAnswer) {
      player.score += 100; // Example points; modify based on your rules
    }
  });

  // Update the leaderboard with scores
  const leaderboard = document.getElementById('leaderboard-list');
  leaderboard.innerHTML = '';
  players.sort((a, b) => b.score - a.score).forEach(player => {
    const listItem = document.createElement('li');
    listItem.textContent = `${player.name}: ${player.score} points`;
    leaderboard.appendChild(listItem);
  });

  // Show leaderboard
  document.getElementById('leaderboard').style.display = 'block';
}

function resetGame() {
  players.length = 0;
  updateScoreboard();
  document.getElementById('leaderboard').style.display = 'none';
}
