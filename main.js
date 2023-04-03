const squares = Array.from(document.querySelectorAll("#square"));
const startScreen = document.getElementById("start-screen");
const winningScreen = document.getElementById("winning-screen");
const winningMessage = document.getElementById("winning-message");
let player1Name = document.getElementById("player1");
let player2Name = document.getElementById("player2");
const startBtn = document.getElementById("start-button");
const restartBtn = document.getElementById("restart-button");
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = ["", "", "", "", "", "", "", "", ""];

const player = (name, mark) => {
  return { name, mark };
};

let player1 = player("Player1", "X");
let player2 = player("Player2", "O");

let currentPlayer;

const startGame = () => {
  startScreen.classList.remove("show");
  player1.name = player1Name.value;
  player2.name = player2Name.value;
  currentPlayer = player1;
};

const validMove = (square) => {
  if (square.textContent === "X" || square.textContent === "O") {
    return false;
  } else {
    return true;
  }
};

// build function  that allow players to add marks to the specific square
const clickedSquare = (square, index) => {
  if (validMove(square)) {
    square.textContent = currentPlayer.mark;
    square.classList.add(currentPlayer.mark);
    board[index] = currentPlayer.mark;
    checkWinner();
    switchPlayer();
  }
};

squares.forEach((square, index) => {
  square.addEventListener("click", () => clickedSquare(square, index));
});

const switchPlayer = () => {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
};

const restartGame = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  winningScreen.classList.remove("show");
  startScreen.classList.add("show");
  player1Name.value = "";
  player2Name.value = "";

  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("X");
    square.classList.remove("O");
  });
};

const checkWinner = () => {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const combo = winningCombos[i];
    const t1 = board[combo[0]];
    const t2 = board[combo[1]];
    const t3 = board[combo[2]];
    if (t1 === "" || t2 === "" || t3 === "") {
      continue;
    }
    if (t1 === t2 && t2 === t3) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    winningMessage.textContent = `${currentPlayer.name} Wins!`;
    winningScreen.classList.add("show");
  }

  if (!board.includes("")) {
    winningMessage.textContent = "It's a tie";
    winningScreen.classList.add("show");
  }
};

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", restartGame);
