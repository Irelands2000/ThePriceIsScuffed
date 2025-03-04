const players = JSON.parse(localStorage.getItem('players')) || [];

document.getElementById('reveal-scores').addEventListener('click', revealScores);
document.getElementById('reset-game').addEventListener('click', resetGame);

function revealScores() {
  const leaderboardList = document.getElementById('leaderboard-list');
  leaderboardList.innerHTML = '';

  players.sort((a, b) => b.score - a.score).forEach(player => {
    const listItem = document.createElement('li');
    listItem.textContent = `${player.name}: ${player.score} points (Guess: ${player.guess})`;
    leaderboardList.appendChild(listItem);
  });
}

function resetGame() {
  localStorage.removeItem('players');
  alert('Game has been reset!');
  location.reload();
}
