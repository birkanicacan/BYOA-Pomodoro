let timeLeft = 25 * 60; // 25 minutes in seconds
let isWorkMode = true;
let isRunning = false;
let timerInterval;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const modeToggleButton = document.getElementById('modeToggle');

const workQuotes = [
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "Quality is not an act, it is a habit.",
    "The future depends on what you do today.",
    "Dreams don't work unless you do.",
    "Focus on being productive instead of busy.",
    "Small progress is still progress.",
    "Don't stop until you're proud.",
    "Make each day your masterpiece.",
    "Discipline is choosing between what you want now and what you want most.",
    "The difference between try and triumph is just a little umph!",
    "The expert in anything was once a beginner.",
    "You don't have to be great to start, but you have to start to be great.",
    "The only bad workout is the one that didn't happen.",
    "Your future is created by what you do today, not tomorrow.",
    "Don't wish it were easier. Wish you were better.",
    "Success is built on daily habits.",
    "Every accomplishment starts with the decision to try.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "It's not about perfect. It's about effort.",
    "Great things never came from comfort zones.",
    "The harder you work, the luckier you get.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Sometimes later becomes never. Do it now.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Do something today that your future self will thank you for.",
    "Little things make big days.",
    "It's going to be hard, but hard does not mean impossible.",
    "Don't stop when you're tired. Stop when you're done.",
    "The key to success is to focus on goals, not obstacles.",
    "Dream it. Believe it. Build it.",
    "Your only limit is you.",
    "Stay focused, stay positive, stay strong.",
    "Success doesn't come to you, you go to it.",
    "The future belongs to those who prepare for it today.",
    "Don't count the days, make the days count.",
    "You are stronger than you think.",
    "It always seems impossible until it's done.",
    "Fall seven times, stand up eight.",
    "The best way to predict the future is to create it.",
    "Your attitude determines your direction.",
    "The only person you should try to be better than is who you were yesterday.",
    "Success is walking from failure to failure with no loss of enthusiasm.",
    "Don't wait for opportunity. Create it.",
    // ... continuing with more quotes ...
];

const breakQuotes = [
    "Take a deep breath. You've earned this break.",
    "Rest is not a waste of time, it's an investment in well-being.",
    "Pause, reflect, and recharge.",
    "Mindful breaks lead to mindful work.",
    "Your mind needs rest to stay sharp.",
    "Take time to do what makes your soul happy.",
    "Peace begins with a pause.",
    "Sometimes the most productive thing you can do is relax.",
    "Breathe in peace, breathe out stress.",
    "Moments of rest are moments of restoration.",
    // ... more relaxation-focused quotes ...
];

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
    
    // Update the document title to show current timer
    const mode = isWorkMode ? 'Work' : 'Break';
    document.title = `(${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}) ${mode}`;
}

function updateQuote() {
    const quoteElement = document.getElementById('quote');
    const currentQuotes = isWorkMode ? workQuotes : breakQuotes;
    quoteElement.textContent = currentQuotes[Math.floor(Math.random() * currentQuotes.length)];
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                return;
            }
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    isRunning = false;
    startPauseButton.textContent = 'Start';
    startPauseButton.classList.remove('running');
    updateDisplay();
    updateQuote();
}

function toggleTimer() {
    isRunning = !isRunning;
    startPauseButton.textContent = isRunning ? 'Pause' : 'Start';
    startPauseButton.classList.toggle('running', isRunning);
    
    if (isRunning) {
        startTimer();
    } else {
        pauseTimer();
    }
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    modeToggleButton.textContent = isWorkMode ? 'Switch to Break Mode' : 'Switch to Work Mode';
    modeToggleButton.classList.toggle('work-mode', isWorkMode);
    modeToggleButton.classList.toggle('break-mode', !isWorkMode);
    resetTimer();
    updateQuote();
}

// Initialize
updateDisplay();
updateQuote();

// Event listeners
startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', toggleMode);

// Make sure the title is set initially
document.title = '(25:00) Work'; 