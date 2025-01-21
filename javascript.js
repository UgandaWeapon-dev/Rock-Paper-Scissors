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
