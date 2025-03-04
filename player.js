const players = JSON.parse(localStorage.getItem('players')) || [];
let playerName = '';
let playerGuess = '';

document.getElementById('lock-guess').addEventListener('click', lockGuess);

function lockGuess() {
  playerName = document.getElementById('player-name').value.trim();
  playerGuess = document.getElementById('player-guess').value.trim();

  if (!playerName || !playerGuess) {
    alert('Please enter your name and guess!');
    return;
  }

  const player = players.find(p => p.name === playerName);
  if (player) {
    player.guess = playerGuess;
  } else {
    players.push({ name: playerName, guess: playerGuess, score: 0 });
  }

  localStorage.setItem('players', JSON.stringify(players));

  document.getElementById('message').innerText = 'Your guess has been locked in!';
}
