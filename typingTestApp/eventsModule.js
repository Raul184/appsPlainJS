const eventsModule = (function(dModule, uModule, cModule, wModule){
    const addEventListeners = function(){

        //character typing event listener

        //click on download button event listener

    };


    return {
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
            
            //format the active word: UI Module

            //focus on text input: UI Module


            //add avent listeners
            addEventListeners();
        }
    };


})(dataModule, UIModule, certificateModule, wordsModule);
