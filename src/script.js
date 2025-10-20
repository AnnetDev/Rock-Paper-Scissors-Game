const body = document.querySelector('body');
const gameContainer = document.querySelector('[data-id="game-section"]');
const humanScoreValue = document.querySelector('[data-id="human-score-value"]');
const computerScoreValue = document.querySelector('[data-id="computer-score-value"]');
const humanChoiceIcon = document.querySelector('[data-id="human-choice-icon"]');
const computerChoiceIcon = document.querySelector('[data-id="computer-choice-icon"]');
const choiceList = document.querySelector('[data-id="choice-list"]');
const rockChoice = document.querySelector('[data-id="rock-choice"]');
const paperChoice = document.querySelector('[data-id="paper-choice"]');
const scissorsChoice = document.querySelector('[data-id="scissors-choice"]');
const playAgainBtn = document.querySelector('[data-id="play-again-btn"]');
const resetBtn = document.querySelector('[data-id="reset-btn"]');

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const choiceIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[choiceIndex];

    if (computerChoice === 'rock') computerChoiceIcon.textContent = '🪨';
    else if (computerChoice === 'paper') computerChoiceIcon.textContent = '📄';
    else if (computerChoice === 'scissors') computerChoiceIcon.textContent = '✂️';

    return computerChoice;
}

function updateScore() {
    humanScoreValue.textContent = humanScore;
    computerScoreValue.textContent = computerScore;
}

function playRound(humanChoice) {
    const computerChoice = getComputerChoice();
    const existingMessage = document.querySelector('.message');
    if (existingMessage) existingMessage.remove();

    const message = document.createElement('div');
    message.classList.add('message');

    function showMessage(text) {
        message.textContent = text;
        gameContainer.appendChild(message);

        // Плавное появление
        requestAnimationFrame(() => {
            message.classList.add('message--visible');
        });

        body.classList.add('overlay-active');

        setTimeout(() => {
            message.classList.remove('message--visible');
        }, 1600);

        setTimeout(() => {
            body.classList.remove('overlay-active');
            message.remove();
        }, 2000);
    }

    function roundAnimation(callback) {
        humanChoiceIcon.classList.remove('icon--hit');
        computerChoiceIcon.classList.remove('icon--hit');

        requestAnimationFrame(() => {
            humanChoiceIcon.classList.add('icon--hit');
            computerChoiceIcon.classList.add('icon--hit');
        });

        setTimeout(() => {
            humanChoiceIcon.classList.remove('icon--hit');
            computerChoiceIcon.classList.remove('icon--hit');
            callback();
        }, 1000);
    }

    roundAnimation(() => {
        if (humanChoice === computerChoice) {
            showMessage("It's a tie! ⚖️");
        } else if (
            (humanChoice === 'rock' && computerChoice === 'scissors') ||
            (humanChoice === 'paper' && computerChoice === 'rock') ||
            (humanChoice === 'scissors' && computerChoice === 'paper')
        ) {
            humanScore++;
            showMessage("You win this round! 🏆");
        } else {
            computerScore++;
            showMessage("Computer wins this round! 💻");
        }

        updateScore();
    });
}


choiceList.addEventListener('click', (e) => {
    const choiceItem = e.target.closest('li[data-id]');

    if (!choiceItem) return;

    let humanChoice;

    switch (choiceItem.dataset.id) {
        case 'rock-choice':
            humanChoiceIcon.textContent = '🪨';
            humanChoice = 'rock';
            break;
        case 'paper-choice':
            humanChoiceIcon.textContent = '📄';
            humanChoice = 'paper';
            break;
        case 'scissors-choice':
            humanChoiceIcon.textContent = '✂️';
            humanChoice = 'scissors';
            break;
    }

    if (humanChoice) {
        playRound(humanChoice);
    }
});

resetBtn.addEventListener('click', () => {
    humanScore = 0;
    computerScore = 0;
    updateScore();
    humanChoiceIcon.textContent = '✋🏻';
    computerChoiceIcon.textContent = '✋🏻';
});

playAgainBtn.addEventListener('click', () => {
    humanChoiceIcon.textContent = '✋🏻';
    computerChoiceIcon.textContent = '✋🏻';
})
