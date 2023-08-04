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
  // Converts player selection to Proper case
  playerSelection = playerSelection[0].toUpperCase() +
                    playerSelection.slice(1).toLowerCase();
  
  let playerIndex = choices.indexOf(playerSelection);
  let computerIndex = choices.indexOf(computerSelection);

  return makeBounded(playerIndex - computerIndex);
}