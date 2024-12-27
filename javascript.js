/*

playGame
-Make playRound function and score variable inside playGame function
- While playRound >= 5, continue game, else end game

Get User's input
- create function 'getHumanChoice'
- prompt to get user's input
    - validate input for choice

Generate Computer's input
- create function 'getComputerChoice'
    - this function will randomly return string values: "rock", "paper", and "scissors"

Track score
- Create variables 'humanScore' and 'computerScore' in global scope
    - Initialize variable with value: 0

Determine playRound
- Define two parameters: 'humanChoice' and 'computerChoice'
    - make human choices case-insensitive
- Write string value declaring the round winner
- Increment humanScore / computerScore based on winner

*/

// Declarations
let humanScore = 0, computerScore = 0;
let humanChoice, computerChoice;

// Gets the user's input and validates them
function getHumanChoice() {
    humanChoice = prompt("Enter your choice (rock, paper, or scissors).").toLowerCase(); 
    switch (humanChoice) {
        case "rock":
        case "paper":
        case "scissors":
            console.log(`You chose ${humanChoice}!`);
            return humanChoice;
        default:
            console.log("Invalid input, try again.");
            getHumanChoice();
            break;
    }
}

// Randomly generates the computer's choice
function getComputerChoice() {
    let randomChoice = Math.floor(Math.random() * 3) + 1;

    switch (randomChoice) {
        case 1:
            console.log("Computer chose rock!");
            return computerChoice = "rock";
        case 2:
            console.log("Computer chose paper!");
            return computerChoice = "paper";
        case 3:
            console.log("Computer chose scissors!");
            return computerChoice = "scissors";
    }
}

/* 
Compares user and computer's choice to determine winner

Rock > Scissors
Paper > Rock
Scissors > Paper

*/
function playRound(humanChoice, computerChoice) {
        
    switch (true) {
        case (humanChoice === computerChoice):
            console.log("It's a tie!");
            break;
        case (humanChoice === "rock" && computerChoice === "scissors"):
        case (humanChoice === "paper" && computerChoice === "rock"):
        case (humanChoice === "scissors" && computerChoice === "paper"):
            console.log(`You win, ${humanChoice} beats ${computerChoice}!`);
            break;
        default:
            console.log(`You lost, ${computerChoice} beats ${humanChoice}!`);
            break;

    }
}

// Play a single round
const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

playRound(humanSelection, computerSelection);
