const dataModule = (function(){
    // PRIVATE
    // const lineReturn = '|';
    // 1
    let appData = {
        indicators: {
            testStarted: false, //test must starts by User action
            testEnded: false, //no start, no end
            totalTestTime: 0, //to be set manually
            timeLeft: 0   //to be updated with a function
        },
        results: {
            wpm: 0,
            wpmChange: 0,
            cpm: 0,
            cpmChange: 0,
            accuracy: 0,
            accuracyChange: 0 ,
            numOfCorrectWords: 0,
            numOfCorrectCharacters: 0 ,
            numOfTestCharacters: 0
        },
        // CURRENT WORD BEING TYPED + CORRECT one on TEX PROVIDED
        words: { //INDEX to track User progress (active word being typed live)
            currentWordIndex: 0,
            testWords: [],
            currentWord: {}
        },
    };
    // CURRENT WORD BEING TYPED + CORRECT one on TEX PROVIDED
    //word constructor FOR NEWWORD TYPED BY USER & MATCH BY MACHINE WITH THE TEXT PROVIDED
//    {
//      value: {correct: '', user: '' , isCorrect: false },
//      characters: {correct: [], user: [], totalCorrect: 0, totalTest: 0 }
//    }
    // 2
    let word = function(index){};
    //update NEWWORD
    word.prototype.update = function(value){};
//-------------------------
    // PUBLIC
    return {
    //INDICATORS - test Control

        setTestTime: function(x){},//sets the total test time to x

        initializeTimeLeft(){},//initializes time left to the total test time

        startTest: function(){},//starts the test (TRUE)

        endTest: function(){},//ends the test (true)

        getTimeLeft: function(){},//return the remaining test time

        reduceTime: function(){},// reduces the time by one sec

        timeLeft(){},//checks if there is time left to continue the test

        testEnded(){},//checks if the test has already ended

        testStarted(){},//checks if the test has started

    //RESULTS

        calculateWpm: function(){},//calculates wpm and wpmChange and updates them in appData

        calculateCpm: function(){},//calculates cpm and cpmChange and updates them in appData

        calculateAccuracy: function(){},//calculates accuracy and accuracyChange and updates them in appData

    //TEXT PROVIDED , WORDS
        // Provide text
        textProvider: function(textSelector, wordsArrConverter){
          let result = wordsArrConverter.split(' ');  //split by words ,arr
          appData.words.testWords = result;   //Text ready and storaged
        },

        getListofWordsTest(){
          return appData.words.testWords;
        },// get list of words ON TEXT PROVIDED

        moveToNewWord: function(){},// increments the currentWordIndex - updates the current word (appData.words.currentWord) by creating a new instance of the word class - updates numOfCorrectWords, numOfCorrectCharacters and numOfTestCharacters

        updateCurrentWord: function(value){},// updates current word using user input
        // getLineReturn(){
        //   return lineReturn;
        // }
        returnData(){
          console.log(appData);
        }
    }

})();
