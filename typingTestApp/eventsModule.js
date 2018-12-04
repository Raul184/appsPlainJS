const eventsModule = (function(dModule, uModule, cModule, wModule){
// PRIVATE
    const addEventListeners = function(){
        let domStr = uModule.getDomElements();
        // console.log(domStr);
        //character typing event listener
        domStr.textInput.addEventListener('input', function(e){
          //test ended?
          if(dModule.testEnded()){
            return ;
          }
          //test started?
          if(!dModule.testStarted()){
            dModule.startTest();
          }
                  //No, so it starts

                  // get typed word: UI Module
            let typedWord = uModule.getTypedWord(); //to keep permeability
                  // update current Word : DATA Module
            dModule.updateCurrentWord(typedWord);
                  // + active Word
                  let active = dModule.getCurrentWord();
                  uModule.formatWord(active);
                  // pressed 'space' or 'enter'
            if(uModule.spacePressed() || uModule.enterPressed()){
                    //empty input

                  }
        });
        //click on download button event listener

    };

    return {
// PUBLIC
        //init function, initializes the test before start
        init: function(duration, textNumber){
            // DATA
            //get texts into: data Module
            let words = wModule.getWords(textNumber);
            dModule.textsProvider(textNumber, words);
            // UI
            //get texts: UI Module
            let lineReturn = dModule.getLineReturn();
            let testWords = dModule.getListofTestWords();
            uModule.fillContent(testWords, lineReturn);

            // DATA
            //set the total test time
            dModule.setTestTime(duration);
            //update time left: data Module
            dModule.initializeTimeLeft();

            // UI
            //returns time left here to avoid mixin between modules
            let timeLeft = dModule.getTimeLeft();
            //update time left: UI module
            uModule.updateTimeLeft(timeLeft);
            //move to a new word: data Module
            dModule.moveToNewWord();
            //set active Word: UI Module
            let currentWindex = dModule.getCurrentWordIndex();
            uModule.setActiveWord(currentWindex);
            //format the active word: UI Module
            let currentWord = dModule.getCurrentWord();
            uModule.formatWord(currentWord);
            //focus on text input: UI Module
            uModule.inputFocus();
            //add avent listeners
            addEventListeners();
        }
    };

})(dataModule, UIModule, certificateModule, wordsModule);
