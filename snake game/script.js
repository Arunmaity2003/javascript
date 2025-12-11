// Game Constants & Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const menuOverlay = document.getElementById('menu-overlay');
const startBtn = document.getElementById('start-btn');
const menuTitle = document.getElementById('menu-title');

// Config
let TILE_SIZE = 20;
let TILE_COUNT_X = 20;
let TILE_COUNT_Y = 20;
const GAME_SPEED = 100; // ms per frame

// Game State
let snake = [];
let food = { x: 0, y: 0 };
let velocity = { x: 0, y: 0 };
let nextVelocity = { x: 0, y: 0 }; // Buffer for rapid key presses
let score = 0;
let highScore = localStorage.getItem('snake_highscore') || 0;
let gameInterval;
let isGameRunning = false;

// Init High Score UI
highScoreEl.innerText = highScore;

// Resize Handling
function resizeGame() {
    // Calculate max available space with some padding
    const maxWidth = window.innerWidth - 20;
    const maxHeight = window.innerHeight - 20;

    // Determine tile size based on screen size (responsive)
    // We want roughly 20-30 tiles across on mobile, more on desktop
    if (window.innerWidth < 600) {
        TILE_SIZE = Math.floor(Math.min(maxWidth, maxHeight) / 20);
    } else {
        TILE_SIZE = 25;
    }

    // Snap canvas dimensions to multiples of TILE_SIZE
    const cols = Math.floor(maxWidth / TILE_SIZE);
    const rows = Math.floor(maxHeight / TILE_SIZE);

    TILE_COUNT_X = cols > 40 ? 40 : cols; // Cap max width for playability
    TILE_COUNT_Y = rows > 30 ? 30 : rows;

    canvas.width = TILE_COUNT_X * TILE_SIZE;
    canvas.height = TILE_COUNT_Y * TILE_SIZE;

    // If game is not running, just center the view, otherwise we might need to reset position logic
    if (!isGameRunning) {
        // re-render static background if needed
    }
}

window.addEventListener('resize', () => {
    resizeGame();
    if (!isGameRunning) draw(); // Redraw static state
});

// Initial sizing
resizeGame();

// Game Logic
function initGame() {
    // Start in the middle
    const startX = Math.floor(TILE_COUNT_X / 2);
    const startY = Math.floor(TILE_COUNT_Y / 2);

    snake = [
        { x: startX, y: startY },
        { x: startX, y: startY + 1 },
        { x: startX, y: startY + 2 }
    ];

    // Initial movement up
    velocity = { x: 0, y: -1 };
    nextVelocity = { x: 0, y: -1 };

    score = 0;
    scoreEl.innerText = score;

    placeFood();
    isGameRunning = true;
    menuOverlay.style.opacity = '0';
    setTimeout(() => {
        if (isGameRunning) menuOverlay.style.display = 'none';
    }, 300);

    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, GAME_SPEED);
}

function placeFood() {
    let valid = false;
    while (!valid) {
        food.x = Math.floor(Math.random() * TILE_COUNT_X);
        food.y = Math.floor(Math.random() * TILE_COUNT_Y);

        // Make sure food doesn't spawn on snake body
        valid = !snake.some(segment => segment.x === food.x && segment.y === food.y);
    }
}

function gameLoop() {
    update();
    draw();
}

function update() {
    // Apply buffered input
    velocity = { ...nextVelocity };

    const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

    // Wall Collision Check (Game Over)
    if (head.x < 0 || head.x >= TILE_COUNT_X || head.y < 0 || head.y >= TILE_COUNT_Y) {
        gameOver();
        return;
    }

    // Self Collision Check
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head); // Add new head

    // Food Check
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.innerText = score;
        placeFood();
        // Don't pop tail, so snake grows
    } else {
        snake.pop(); // Remove tail
    }
}

function draw() {
    // Clear Screen
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid (Subtle)
    ctx.strokeStyle = '#0a0a20';
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += TILE_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += TILE_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Draw Snake
    // Glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#39ff14';

    snake.forEach((segment, index) => {
        // Head is slightly brighter/different
        ctx.fillStyle = index === 0 ? '#ccffcc' : '#39ff14';

        // Add a small gap between segments for style
        const gap = 2;
        ctx.fillRect(
            segment.x * TILE_SIZE + gap,
            segment.y * TILE_SIZE + gap,
            TILE_SIZE - (gap * 2),
            TILE_SIZE - (gap * 2)
        );
    });

    // Draw Food
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff0055';
    ctx.fillStyle = '#ff0055';

    // Draw food as a diamond or circle
    const cx = food.x * TILE_SIZE + TILE_SIZE / 2;
    const cy = food.y * TILE_SIZE + TILE_SIZE / 2;
    const size = TILE_SIZE / 2.5;

    ctx.beginPath();
    ctx.arc(cx, cy, size, 0, Math.PI * 2);
    ctx.fill();

    // Reset shadow for next frame
    ctx.shadowBlur = 0;
}

function gameOver() {
    isGameRunning = false;
    clearInterval(gameInterval);

    // Update High Score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snake_highscore', highScore);
        highScoreEl.innerText = highScore;
    }

    menuTitle.innerText = "SYSTEM FAILURE";
    startBtn.innerText = "REBOOT";
    menuOverlay.style.display = 'flex';

    // Force reflow
    void menuOverlay.offsetWidth;
    menuOverlay.style.opacity = '1';
}

// Input Handling
document.addEventListener('keydown', (e) => {
    if (!isGameRunning) return;

    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (velocity.y === 0) nextVelocity = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (velocity.y === 0) nextVelocity = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (velocity.x === 0) nextVelocity = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (velocity.x === 0) nextVelocity = { x: 1, y: 0 };
            break;
    }
});

// Touch/Swipe Handling
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent scrolling
    touchStartX = e.changedTouches[0].pageX;
    touchStartY = e.changedTouches[0].pageY;
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (!isGameRunning) return;

    const touchEndX = e.changedTouches[0].pageX;
    const touchEndY = e.changedTouches[0].pageY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Determine if swipe is mostly horizontal or vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal
        if (Math.abs(diffX) > 10) { // Threshold
            if (diffX > 0 && velocity.x === 0) nextVelocity = { x: 1, y: 0 }; // Right
            if (diffX < 0 && velocity.x === 0) nextVelocity = { x: -1, y: 0 }; // Left
        }
    } else {
        // Vertical
        if (Math.abs(diffY) > 10) {
            if (diffY > 0 && velocity.y === 0) nextVelocity = { x: 0, y: 1 }; // Down
            if (diffY < 0 && velocity.y === 0) nextVelocity = { x: 0, y: -1 }; // Up
        }
    }
}, { passive: false });

// Start Button
startBtn.addEventListener('click', initGame);

// Initial Draw (Background)
draw();