let humanHealth = 5, computerHealth = 5; // Start with 5 health for both players
let i = 1;
let gameOver = false; // Add a flag to track game over state

// Select the health-num element
const humanHealthNum = document.querySelector(".health-num");
const necoHealthNum = document.querySelector(".neco-health");

// Select the health-fill element
const healthFill = document.querySelector(".health-fill");
const buttons = document.querySelectorAll("button"); // Select all buttons

// Function to update health and display game status
function healthScore() {
    // Update the health number on the page
    humanHealthNum.textContent = `${humanHealth}/5`;

    // Calculate the remaining health percentage
    const healthPercentage = (humanHealth / 5) * 100;

    // Update the width of the health-fill to reflect remaining health
    healthFill.style.width = `${healthPercentage}%`;

    const animatedTextElement = document.getElementById("animatedText");
    const soundFile = "../sfx/Files_BattleText.ogg"; // Path to your sound effect file

    // Check if the game is won or lost, and ensure it's only processed once
    if (!gameOver) {
        if (humanHealth === 0) {
            gameOver = true; // Mark the game as over
            setTimeout(() => {
                typeWriterEffect(animatedTextElement, "* YOU LOST! Better luck next time.", 35, soundFile, () => {
                    console.log("YOU LOST!");
                    endGame(); // Stop the game
                });
            }, 2000); // 1-second delay
        } else if (computerHealth === 0) {
            gameOver = true; // Mark the game as over
            setTimeout(() => {
                typeWriterEffect(animatedTextElement, "* YOU WON! Congratulations!", 35, soundFile, () => {
                    console.log("YOU WON!");
                    endGame(); // Stop the game
                });
            }, 2000); // 1-second delay
        }
    }
}

// Ends the game by disabling all buttons
function endGame() {
    disableButtons(true); // Disable all buttons
    document.body.classList.add('fade-out'); // Add fade-out class
    setTimeout(() => {
        window.location.href = "../index.html"; // Redirect after fade-out
    }, 2000);
}

// Generates random CPU choice
function getComputerChoice() {
    let randomChoice = Math.floor(Math.random() * 3) + 1;
    switch (randomChoice) {
        case 1:
            console.log("Computer chose rock");
            return "rock";
        case 2:
            console.log("Computer chose paper");
            return "paper";
        case 3:
            console.log("Computer chose scissors");
            return "scissors";
    }
}


function updateNecoHealth() {
    // Update the Neco health number
    necoHealthNum.textContent = `${computerHealth}/5`;
}

// Simulate a round and compare answers
function playRound(humanChoice, computerChoice) {
    const animatedTextElement = document.getElementById("animatedText");
    const soundFile = "../sfx/Files_BattleText.ogg"; // Path to your sound effect file

    const attackSound = document.getElementById("attackSound"); // Select attack sound
    const dodgeSound = document.getElementById("dodgeSound"); // Select dodge sound

    let message = "";

    switch (true) {
        case (humanChoice === computerChoice): // Tie scenario
            message = `* Neco Arc dodged your ${humanChoice}!`;
            console.log(message);

            // Play the dodge sound
            if (dodgeSound) {
                dodgeSound.currentTime = 0; // Reset to start
                dodgeSound.play(); // Play dodge sound
            }
            break;

        case (humanChoice === "rock" && computerChoice === "scissors"):
        case (humanChoice === "paper" && computerChoice === "rock"):
        case (humanChoice === "scissors" && computerChoice === "paper"): // Win scenario
            message = `* Your ${humanChoice} beats Neco Arc's ${computerChoice}!`;
            computerHealth--; // Decrease computer's health
            updateNecoHealth(); // Update Neco's health display

            // Play the attack sound
            if (attackSound) {
                attackSound.currentTime = 0; // Reset to start
                attackSound.play(); // Play attack sound
            }
            break;

        case (humanChoice === "rock" && computerChoice === "paper"):
        case (humanChoice === "paper" && computerChoice === "scissors"):
        case (humanChoice === "scissors" && computerChoice === "rock"): // Lose scenario
            message = `* Neco Arc's ${computerChoice} countered your ${humanChoice}!`;
            triggerDamageEffect(); // Trigger health decrease + screen shake
            break;

        case (humanChoice === "quit"): // Mercy attempt
            message = `* Neco Arc ignored your attempt at mercy.`;
            triggerDamageEffect(); // Trigger health decrease + screen shake
            break;
    }

    typeWriterEffect(animatedTextElement, message, 35, soundFile, () => {
        healthScore(); // Update health display after the text finishes
        if (humanHealth > 0 && computerHealth > 0) {
            disableButtons(false); // Re-enable buttons only if the game isn't over
        }
    });
}

// Select hover and click audio elements
const hoverSfx = document.getElementById("hover-sfx");
const clickSfx = document.getElementById("click-sfx");

// Add event listeners to buttons
buttons.forEach((button) => {
    // Play hover-sfx when mouse enters a button
    button.addEventListener("mouseenter", () => {
        if (hoverSfx) {
            hoverSfx.currentTime = 0; // Reset to start
            hoverSfx.play(); // Play hover sound
        }
    });

    // Play click-sfx when a button is clicked
    button.addEventListener("click", () => {
        if (clickSfx) {
            clickSfx.currentTime = 0; // Reset to start
            clickSfx.play(); // Play click sound
        }

        // Handle the game logic
        let humanSelection = button.className;
        disableButtons(true); // Disable buttons during the round
        playGame(humanSelection);
    });
});


// Play Game
function playGame(humanSelection) {
    // Only play the game while both players still have health
    if (humanHealth > 0 && computerHealth > 0) {
        console.log(`\nRound ${i}: `);

        // Play a single round
        console.log(`You chose ${humanSelection}`);
        const computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection);
        i++;
    } else {
        // If either player's health is 0, stop the game
        console.log("Game Over!");
    }
}

/* Sound Effects */

const sound = new Audio('Files_BattleText.ogg');
sound.muted = true;
sound.play().then(() => {
    sound.muted = false; // Unmute for subsequent use
}).catch(error => {
    console.log("Autoplay restriction: Audio interaction required", error);
});

function typeWriterEffect(element, text, speed = 100, soundFile = null, callback = null) {
    element.textContent = ""; // Clear any existing text
    let i = 0;
    const sound = soundFile ? new Audio(soundFile) : null; // Load the sound file if provided

    function typeCharacter() {
        if (i < text.length) {
            element.textContent += text.charAt(i); // Add one character
            if (sound) {
                sound.currentTime = 0; // Reset sound to start for each character
                sound.play(); // Play the sound effect
            }
            i++;
            setTimeout(typeCharacter, speed); // Schedule next character
        } else if (callback) {
            callback(); // Call the callback function after typing finishes
        }
    }

    typeCharacter(); // Start the typing effect
}

function disableButtons(disable) {
    buttons.forEach((button) => {
        button.disabled = disable; // Disable or enable each button
    });
}

// Get the target element and set the text
const animatedTextElement = document.getElementById("animatedText");
const textToAnimate = "* You encountered Neco Arc.";
const soundFile = "../sfx/Files_BattleText.ogg"; // Path to your sound effect file
typeWriterEffect(animatedTextElement, textToAnimate, 35, soundFile);

// Combined screen shake and health decrease
function triggerDamageEffect() {
    const container = document.querySelector(".container");
    const hurtSound = document.getElementById("hurtSound"); // Select the audio element

    humanHealth--; // Decrease health
    healthScore(); // Immediately update health bar

    // Play the hurt sound
    if (hurtSound) {
        hurtSound.currentTime = 0; // Reset audio to the beginning
        hurtSound.play(); // Play the sound effect
    }

    // Add screen shake effect
    container.classList.add("shake");
    setTimeout(() => container.classList.remove("shake"), 500); // Match shake duration
}

const backgroundMusic = new Audio('../sfx/Fun_Fun_Fun.mp3');
backgroundMusic.loop = true;

document.addEventListener('DOMContentLoaded', () => {
    const musicState = localStorage.getItem('musicPlaying');
    if (musicState === 'true') {
        backgroundMusic.play().catch(err => console.error('BGM autoplay restriction:', err));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
});
