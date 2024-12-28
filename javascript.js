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
- Write string value declaring the round winner
- Increment humanScore / computerScore based on winner
*/

// Declarations
let humanScore = 0, computerScore = 0;

// Gets the user's input and validates them
function getHumanChoice() {

    // Loop will continue to run until valid input
    let humanChoice = null;
    while (true) {
        humanChoice = prompt("Enter your choice (rock, paper, or scissors).").toLowerCase(); 
        switch (humanChoice) {
            case "rock":
            case "paper":
            case "scissors":
                console.log(`You chose ${humanChoice}!`);
                return humanChoice;
            default:
                alert("Invalid input, try again.");
                break;
        }
    }
}

// Randomly generates the computer's choice
function getComputerChoice() {
    let randomChoice = Math.floor(Math.random() * 3) + 1;
    switch (randomChoice) {
        case 1:
            console.log("Computer chose rock!");
            return "rock";
        case 2:
            console.log("Computer chose paper!");
            return "paper";
        case 3:
            console.log("Computer chose scissors!");
            return "scissors";
    }
}

// Plays a round, compares choices to determine winner
function playRound(humanChoice, computerChoice) {        
    switch (true) {
        case (humanChoice === computerChoice):
            console.log("It's a tie!");
            break;
        case (humanChoice === "rock" && computerChoice === "scissors"):
        case (humanChoice === "paper" && computerChoice === "rock"):
        case (humanChoice === "scissors" && computerChoice === "paper"):
            console.log(`You win, ${humanChoice} beats ${computerChoice}!`);
            humanScore++;
            break;
        default:
            console.log(`You lose, ${computerChoice} beats ${humanChoice}!`);
            computerScore++;
            break;
    }
}

// Main game loop
function playGame() {

    // Loops for 5 rounds
    for (let i = 1; i < 6; i++) {
        console.log(`\nRound ${i}: `);

        // Play a single round
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection);
    }

    // Declares result
    switch (true) {
        case (humanScore === computerScore):
            console.log(`\nIt's a tie! \nScore - You: ${humanScore}, Computer: ${computerScore}`);
            break;
        case (humanScore > computerScore):
            console.log(`\nYou win! \nScore - You: ${humanScore}, Computer: ${computerScore}`);
            break;
        case (humanScore < computerScore):
            console.log(`\nYou lose! \nScore - You: ${humanScore}, Computer: ${computerScore}`);
    }
}

// Automatically start game
playGame();