// Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

// Ui elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(event){
    if(event.target.className === 'play-again'){
        window.location.reload();
    }
})

// Listen guess event
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    
    // validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    }

    // check if won
    if(guess === winningNum){
        // disable input
        gameOver(true, `${winningNum} is correct!, YOU WIN`);
    } else {
        // wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            gameOver(false,`Game over, you lost. The correct number was ${winningNum}`);

        } else {
            // game continues - answer wrong
            // change border color
            guessInput.style.borderColor = 'red';
            // clear input
            guessInput.value = '';
            // tell user the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});


// Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
  // disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // set text color
  message.style.color = color;
  // set message
  setMessage(msg);
  // play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}