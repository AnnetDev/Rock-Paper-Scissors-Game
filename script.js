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
        

    if (humanChoice === computerChoice) {
        console.log("It's a tie!");
        gameContainer.createElement('div').textContent = "It's a tie!";
    } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        humanScore++;
        console.log("You win this round!");
    } else {
        computerScore++;
        console.log("Computer wins this round!");
    }

    updateScore();
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
