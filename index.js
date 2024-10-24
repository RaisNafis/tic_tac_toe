let ygDiisi = Array(9).fill(null);
let currentPlayer = "X";
let gameMulai = false;

const player1_score = document.getElementById("player1-score");
let p1_score = 0;
const player2_score = document.getElementById("player2-score");
let p2_score = 0;

const current_player = document.getElementById("current-player");

const box_tictac = document.querySelectorAll(".box-tictac");
const wincoy = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 2, 8],
  [2, 4, 6],
];

document.getElementById("reset-game").addEventListener("click", resetGame);

box_tictac.forEach((box, index) => {
  box.onclick = () => {
    if (!ygDiisi[index]) {
      gameMulai = true;
      if (gameMulai) {
        ygDiisi[index] = currentPlayer;
        box_tictac[index].textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        current_player.textContent = `Current Player: ${currentPlayer}`;
        checkWinner();
      }
    }
  };
});

function checkWinner() {
  let winner = "";
  wincoy.forEach((combo) => {
    let [a, b, c] = combo;
    if (ygDiisi[a] && ygDiisi[a] === ygDiisi[b] && ygDiisi[a] === ygDiisi[c]) {
      winner = ygDiisi[a];
    }
  });
  if (winner) {
    updateScore(winner);
    Swal.fire({
      title: `Player ${winner} wins!`,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      resetGame();
    });
  } else if (!ygDiisi.includes(null)) {
    gameActive = false;
    Swal.fire({
      title: "It's a draw!",
      icon: "info",
      confirmButtonText: "OK",
    }).then(() => {
      resetGame();
    });
  }
}

function updateScore(winner) {
  if (winner === "X") {
    p1_score++;
    player1_score.textContent = p1_score;
  } else {
    p2_score++;
    player2_score.textContent = p1_score;
  }
}

function resetGame() {
  if (gameMulai) {
    gameMulai = false;
    ygDiisi = Array(9).fill(null);
    box_tictac.forEach((e) => {
      e.textContent = "";
    });
    currentPlayer = "X";
    current_player.textContent = "Current Player X";
    Swal.fire({
      title: `Game reset`,
      icon: "success",
    });
  } else {
    Swal.fire({
      title: `Play the game first`,
      icon: "warning",
    });
  }
}
