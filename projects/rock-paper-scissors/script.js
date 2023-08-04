/* 
getComputerChoice()
  - randomly returns "Rock", "Paper", or "Scissors"

playRound(playerSelection, computerSelection)
  - case insensitive
  - returns the whole string (e.g., "You Lose! Paper beats Rock")

game()
  - calls playRound() 5 times to play a 5 round game
    - uses prompt() to get user input
    - keeps score
    - console.log() result of each round
  - reports winner or loser at the end
    - console.log

R (0)
  R 0 draw
  P -1 lose
  S -2 win

p (1)
  R 1 win
  P 0 draw
  S -1 lose

S (2)
  R 2 lose
  P 1 win
  S 0 draw

win -2, 1
draw 0
lose -1, 2
*/

const choices = ["Rock", "Paper", "Scissors"];
const makeBounded = (n) => {
  if (n < -1) return n + 3
  if (n > 1)  return n - 3
  return n
};

const getComputerChoice = () => 
  choices[Math.floor(3 * Math.random())]

function playRound(playerSelection, computerSelection)
{  
  let playerIndex = choices.indexOf(playerSelection);
  let computerIndex = choices.indexOf(computerSelection);

  return makeBounded(playerIndex - computerIndex);
}

function game()
{
  let overallScore = 0;

  for (let i = 0; i < 5; i++)
  {
    let playerSelection;
    
    while (!choices.includes(playerSelection))
    {
      playerSelection = prompt(`Round ${i + 1}: Enter Rock, Paper, or Scissors:`);
      playerSelection = playerSelection[0].toUpperCase() +
                        playerSelection.slice(1).toLowerCase();
    }

    let computerSelection = getComputerChoice();
    let roundOutcome = playRound(playerSelection, computerSelection)

    logOutcome(roundOutcome, playerSelection, computerSelection);
    overallScore += roundOutcome;
  }
}

function logOutcome(roundOutcome, playerSelection, computerSelection)
{
  switch (roundOutcome)
  {
    case -1:
      console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
      break;
    
    case 0:
      console.log(`Draw! ${computerSelection} draws with ${playerSelection}`);
      break;

    case 1:
      console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
      break;
  }
}
