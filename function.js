let guessedLettersElement = document.querySelector(".guessed-letters");
let remainingGuessesElement = document.querySelector(".remaining span");
let wordInProgressElement = document.querySelector(".word-in-progress");
let messageElement = document.querySelector(".message");
let letterInput = document.querySelector(".letter");
let guessButton = document.querySelector(".guess");
let playAgainButton = document.querySelector(".play-again");

let word = "";
let guessedLetters = [];
let remainingGuesses = 8;

function pickWord() {
    word = words[Math.floor(Math.random() * words.length)];
};

function updateWordInProgress() {
    const wordArray = word.split("");
    const displayWord = wordArray.map(letter => (guessedLetters.includes(letter) ? letter : "●")).join("");
    wordInProgressElement.textContent = displayWord;
};

function updateRemainingGuesses(guess) {
    if (!word.includes(guess)) {
        remainingGuesses -= 1;
    }
    remainingGuessesElement.textContent = remainingGuesses;
};

function checkWin() {
    if (word === wordInProgressElement.textContent) {
        messageElement.textContent = "You guessed the word! Congratulations!";
        guessButton.disabled = true;
        playAgainButton.classList.remove("hide");
    }
};

function checkLoss() {
    if (remainingGuesses <= 0) {
        messageElement.textContent = `Sorry, you ran out of guesses! The word was "${word}".`;
        guessButton.disabled = true;
        playAgainButton.classList.remove("hide");
    }
};

guessButton.addEventListener("click", (e) => {
    e.preventDefault();
    const guess = letterInput.value.toLowerCase();
    if (guess && guess.length === 1 && !guessedLetters.includes(guess)) {
        guessedLetters.push(guess);
        guessedLettersElement.innerHTML += `<li>${guess}</li>`;
        updateWordInProgress();
        updateRemainingGuesses(guess);
        checkWin();
        checkLoss();
    }
    letterInput.value = "";
});

playAgainButton.addEventListener("click", () => {
    messageElement.textContent = "";
    guessedLetters = [];
    remainingGuesses = 8;
    guessedLettersElement.innerHTML = "";
    remainingGuessesElement.textContent = remainingGuesses;
    guessButton.disabled = false;
    playAgainButton.classList.add("hide");
    pickWord();
    updateWordInProgress();
});

pickWord();
updateWordInProgress();

