// Game Rules
// - Player must guess a number from a given range
// - Player gets a certain amount of guesses
// - Notify player of guesses remaining
// - Option to play again
const uiController = function(){
    getRandom = (max , min) =>{
        return Math.floor(Math.random()* (max - min +1));
    }
    let scores = {
      min : 1,
      max : 10,
      winningNum : this.getRandom(this.min, this.max),
      guessesLeft : 3
    };
// UI elements
    let dom = {
        game : document.querySelector('#game'),
        minimum : document.querySelector('.min-num'),
        maximum : document.querySelector('.max-num'),
        guessBtn : document.querySelector('#guess-btn'),
        guessInput : document.querySelector('#guess-input'),
        message : document.querySelector('.message')
    };
    dom.minimum.textContent = scores.min;
    dom.maximum.textContent = scores.max;
  return {
      getDomStrings : function(){
        return dom;
      },
      getGameScores : function(){
        return scores;
      }
    }
}();
//----------------------------------------------
const db = function(ui){
    return{
      setMessage : function (mes, color){
          let input = ui.getDomStrings();
          input.message.style.color = color;
          input.message.textContent = mes;
      },
      gameOver : function (won, message){
          let input = ui.getDomStrings();
          let color;
          won === true ? color = 'green' : 'red';
          input.guessInput.disabled = true; //disable element if user wins
          // winner colors
          input.guessInput.style.borderColor = color;
          // set text color
          input.message.style.color = color;
          db.setMessage(message);
          // play Again?
          input.guessBtn.value = 'Play Again';
          input.guessBtn.className += 'play-again';
      }
    }
}(uiController);
//---------------------------------------------------
const globalController = function(ui, db){
    let input = ui.getDomStrings();
    let scores = ui.getGameScores();
    return{
      init: function(){
          // EventListeners
          input.guessBtn.addEventListener('click', function(){
              let guessNum = parseInt(input.guessInput.value); //number
              // validate
              if( isNaN(guessNum) || guessNum < scores.min || guessNum > scores.max){
                  db.setMessage(`Please input a number between ${scores.min} and ${scores.max}`, 'red');
              }//check if won
              if(guessNum === scores.winningNum){
                  db.gameOver(true, `${scores.winningNum} is correct! , You  win!!`);
              }else{
                  //substract 1
                  scores.guessesLeft -= 1;
                  input.guessInput.value = '';
                  if( scores.guessesLeft === 0){
                      db.gameOver(false, `Game Over , sorry , you lost. The winning number was: ${scores.winningNum}`);
                  }else {
                      //Game  continues
                      input.guessInput.style.borderColor = 'red';
                      // clear Input
                      input.guessInput.value = '';
                      // message
                      db.setMessage(`${guessNum} is not correct, you still got ${scores.guessesLeft} chances left`, 'red');
                  }
              }
          });
            input.game.addEventListener('mousedown', function(e){
                if(e.target.className === 'play-again'){
                      window.location.reload();
                      input.guessInput.value = '';
                }
            });
      }
  }
}(uiController, db);
globalController.init();
