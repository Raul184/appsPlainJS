// Game Rules
// - Player must guess a number from a given range
// - Player gets a certain amount of guesses
// - Notify player of guesses remaining
// - Option to play again

// Game values
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
       minimum = document.querySelector('.min-num'),
       maximum = document.querySelector('.max-num'),
       guessBtn = document.querySelector('#guess-btn'),
       guessInput = document.querySelector('#guess-input'),
       message = document.querySelector('.message');

// Assign UI min/max
minimum.textContent = min;
maximum.textContent = max;

// EventListeners
guessBtn.addEventListener('click', function(){
    let guessedNum = parseInt(guessInput.value); //get a number
    // validate
    if( isNaN(guessedNum) || guessedNum < min || guessedNum > max){
        setMessage(`Please entre a number between ${min} and ${max}`, 'red');
    }//check if won
    if(guessedNum === winningNum){
        gameOver(true, `${winningNum} is correct! , You win!!`);
    }  else{
        //substract 1
        guessesLeft -= 1;
        if( guessesLeft === 0){
            //Game over
          gameOver(false, `Game Over , sorry , you lost. The winning number was: ${winningNum}`);
        }else {
            //Game  continues
            guessInput.style.borderColor = 'red';
            // clear Input
            guessInput.value = ' ';
            // message
            setMessage(`${guessedNum} is not correct, you still got ${guessesLeft} chances left`, 'red');
        }
    }
});

function setMessage(mes, color){
    message.style.color = color;
    message.textContent = mes;
}

function gameOver(won, message){
  let color;
  won === true ? color = 'green' : 'red';
  guessInput.disabled = true; //disable element if user wins
  // winner colors
  guessInput.style.borderColor = color;
  // set text color
  message.style.color = color;
  setMessage(message);
}
