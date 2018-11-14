console.log('works?');
// GAME RULES:
 // - 1. The game has 2 players playing by rounds.
// -  2. Every player can roll a dice as many time as he/she wants and each result will be stored in his/her Round score
// -  3. If any player rolls a 1 during his/her round , all the score gotten in the round will be lost and next player will start a new round
// -  4. First player on reach 100 score wins the game
// -  5. Every player can roll a dice as many time as he/she wants and each result will be stored in his/her Round score

//stateVariable to be declared(gamePlaying);
// GLOBAL----------------------------------------------------
var scores, roundScores, activePl, gamePlaying;

init();

// DRY Principle
function init(){
  // Player scores
  scores = [0, 0];
  // roundScores
  roundScores = 0;
  // Who is playing?
  activePl = 0;   //1 is player 2
  gamePlaying = true;
  // DOM -----------------------------------------------------
  // Dice hidden till game starts
  document.querySelector('.dice').style.display = 'none';
  //Global Scores set to 0 for Players
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  // Round Scores
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // Players
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  //Active & Winner classes to be removed
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  //default
  document.querySelector('.player-0-panel').classList.add('active');
}

 nextPlayer = () => {
  //next player
    activePl === 0 ? activePl = 1: activePl = 0;
    // set round Score to 0 on JS
    roundScores = 0;
    // restart scores to 0 for new round (on DOM)
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //reflect next player (active) on DOM
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //hide Dice aswell
    document.querySelector('.dice').style.display = 'none';
}

// DOM EVENTS------------------------------------
// ROLL THE DICE
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
    //1. Need a random number
        let dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display DICE
        let diceDom = document.querySelector('.dice');  //DICE selected
        diceDom.style.display = 'block'; //displayed
        diceDom.src = `source/img/dice-${dice}.png`;   //proper Img

    // 3. Update round Score if randomNumber is not 1
        if(dice !== 1){
      //Add score
            roundScores += dice;
      // Show score
            document.querySelector(`#current-${activePl}`).innerHTML =`<em> ${dice} </em>`;
          }else {
      //next player
                nextPlayer();
              }
    }
}, false);

// HOLD THE SCORE------------------------------------------
document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
        //Get score for current player
        scores[activePl] +=  roundScores;
        //Update UI
        document.querySelector(`#score-${activePl}`).textContent = scores[activePl];
        //check if player wins the game
        if(scores[activePl] >= 30){ document.querySelector(`#name-${activePl}`).textContent = 'Winner!!';
        document.querySelector(`.player-${activePl}-panel`).classList.add('winner'); //add class winner
        document.querySelector(`.player-${activePl}-panel`).classList.remove('active'); //remove styles from .active one
        gamePlaying = false; //state variable
        }else{
            nextPlayer(); //next Player
          }
      }
}, false);

// NEW GAME-------------------------
// Scores back to 0 / Active player back to 1 / RoundScores back to 0
document.querySelector('.btn-new').addEventListener('click', init);
