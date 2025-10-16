function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const choiceIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[choiceIndex];
    console.log(computerChoice);
    return computerChoice;
}

function getHumanChoice() {
    const humanChoice = prompt("Enter rock, paper, or scissors:").toLowerCase();

    console.log("your hoice: " + humanChoice);
    return humanChoice;
}

function playGame(numRounds) {
    let computerScore = 0;
    let humanScore = 0;

    function playRound(humanChoice, computerChoice) {
        if (humanChoice === computerChoice) {
            return console.log("It's a tie!");
        } else if (
            (humanChoice === 'rock' && computerChoice === 'scissors') ||
            (humanChoice === 'paper' && computerChoice === 'rock') ||
            (humanChoice === 'scissors' && computerChoice === 'paper')
        ) {
            humanScore++;
            return console.log("You win this round!");
        } else {
            computerScore++;
            return console.log("Computer wins this round!");
        }
    }

    let round = 0;
    while(round < numRounds) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection);
        console.log(humanScore, computerScore);
    }

    let winner;
    winner = humanScore > computerScore ? "You win the game!" : humanScore < computerScore ? "Computer wins the game!" : "The game is a tie!";
    console.log(winner);
}

playGame(2);