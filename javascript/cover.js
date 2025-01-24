// Get the audio elements
const hoverSound = document.getElementById('hover-sfx');
const clickSound = document.getElementById('click-sfx');
const backgroundMusic = document.getElementById('bgm');
const musicToggleButton = document.querySelector('.music-toggle');
const playButton = document.querySelector('button.play');
const coverPage = document.getElementById('cover-page');
const game = document.getElementById('game');

// Get all buttons
const buttons = document.querySelectorAll('button');

// Add hover sound effect
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0; // Restart audio
        hoverSound.play().catch(err => console.error('Hover sound error:', err));
    });

    button.addEventListener('click', () => {
        clickSound.currentTime = 0; // Restart audio
        clickSound.play().catch(err => console.error('Click sound error:', err));
    });
});

// Toggle background music
musicToggleButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(err => console.error('BGM play error:', err));
    } else {
        backgroundMusic.pause();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const playLink = document.getElementById('play-link');
    const fadeOverlay = document.getElementById('fade-overlay');

    playLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent immediate navigation

        // Add fade-in class to the overlay
        fadeOverlay.classList.add('fade-in');

        // Wait for animation to complete before navigating
        setTimeout(() => {
            window.location.href = './html/game.html'; // Navigate to the game page
        }, 1000); // Match the fade-in duration
    });
});

playLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent immediate navigation

    // Play background music or a transition sound
    backgroundMusic.play().catch(err => console.error('BGM play error:', err));

    // Add fade-in class to the overlay
    fadeOverlay.classList.add('fade-in');

    // Wait for animation to complete before navigating
    setTimeout(() => {
        window.location.href = './html/game.html'; // Navigate to the game page
    }, 1000); // Match the fade-in duration
});

musicToggleButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(err => console.error('BGM play error:', err));
        localStorage.setItem('musicPlaying', 'true');
    } else {
        backgroundMusic.pause();
        localStorage.setItem('musicPlaying', 'false');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const musicState = localStorage.getItem('musicPlaying');
    if (musicState === 'true') {
        backgroundMusic.play().catch(err => console.error('BGM autoplay restriction:', err));
    }
});
