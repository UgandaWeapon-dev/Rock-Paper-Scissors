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

let humanScore = 0, computerScore = 0;
let humanChoice, computerChoice;

function getHumanChoice() {
    humanChoice = prompt("Enter your choice (rock, paper, or scissors).").toLowerCase(); 
    switch (humanChoice) {
        case "rock":
        case "paper":
        case "scissors":
            console.log(`You chose ${humanChoice}!`);
            break;
            default:
                console.log("Invalid input, try again.");
                etHumanChoice();
            break;
    }
}

function getComputerChoice() {
    let randomChoice = Math.floor(Math.random() * 3) + 1;

    switch (randomChoice) {
        case 1:
            console.log("Computer chose rock!");
            computerChoice = "rock";
            break;
        case 2:
            console.log("Computer chose paper!");
            computerChoice = "paper";
            break;
        case 3:
            console.log("Computer chose scissors!");
            computerChoice = "scissors";
            break;
    }
}

getHumanChoice();
getComputerChoice();