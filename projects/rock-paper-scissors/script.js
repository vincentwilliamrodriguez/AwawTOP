const playerScoreDisplay = document.querySelector(".player .score");
const botScoreDisplay = document.querySelector(".bot .score");
const playerOptions = document.querySelectorAll(".player .option");
const botOptions = document.querySelectorAll(".bot .option");
const infoH2 = document.querySelector(".info .round h2");
const infoP = document.querySelector(".info .round p");
const gameDisplay = document.querySelector(".info .game");
const gameResult = document.querySelector(".info .game p");
const gameWin = document.querySelector(".info .game #win");
const gameLose = document.querySelector(".info .game #lose");
const restartButton = document.querySelector(".info .game .restart");

let playerScore = 0;
let botScore = 0;

const choices = ["Rock", "Paper", "Scissors"];
const makeBounded = (n) => {
  if (n < -1) return n + 3
  if (n > 1)  return n - 3
  return n
};

const getComputerChoice = () => 
  choices[Math.floor(3 * Math.random())]

function playRound(playerSelection, botSelection)
{  
  let playerIndex = choices.indexOf(playerSelection);
  let botIndex = choices.indexOf(botSelection);

  return makeBounded(playerIndex - botIndex);
}

for (let i = 0; i < 3; i++) {
  playerOptions[i].addEventListener("click", (e) => {
    game(choices[i]);
  });
}

function game(playerSelection)
{
  let botSelection = getComputerChoice();
  let roundOutcome = playRound(playerSelection, botSelection)
  console.log("Awaw", playerSelection, botSelection)

  if (roundOutcome == 1)    playerScore++;
  if (roundOutcome == -1)   botScore++;

  updateDisplay(roundOutcome, playerSelection, botSelection);

  if (playerScore > botScore)
  {
    console.log("Player Wins the Game!");
  }
  else if (playerScore < botScore)
  {
    console.log("Computer Wins the Game!");
  }
  else
  {
    console.log("The Game is a Draw!");
  }
}

function updateDisplay(roundOutcome, playerSelection, botSelection)
{
  switch (roundOutcome)
  {
    case -1:
      infoH2.textContent = `You Lose!`;
      infoP.textContent = `${playerSelection} is beaten by ${botSelection}.`;
      break;
    
    case 0:
      infoH2.textContent = `Draw!`;
      infoP.textContent = `${playerSelection} draws with ${botSelection}.`;
      break;

    case 1:
      infoH2.textContent = `You Win!`;
      infoP.textContent = `${playerSelection} beats ${botSelection}.`;
      break;
  }

  for (let i = 0; i < 3; i++) {
    playerOptions[i].style.opacity = 
      (choices[i] !== playerSelection) ? "0.3" : 
                                          "1.0";
  
    botOptions[i].style.opacity = 
      (choices[i] !== botSelection) ? "0.3" : 
                                      "1.0";
  }

  playerScoreDisplay.innerHTML = `Player Score:<br>${playerScore}`;
  botScoreDisplay.innerHTML = `Bot Score:<br>${botScore}`;
}

function restartGame() {

}
