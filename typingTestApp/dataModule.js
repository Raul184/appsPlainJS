const dataModule = (function(){
// PRIVATE
    let lineReturn = '|';
    // DATA BONES
    const appData = {
      // 1
        indicators: {
            testStarted: false,
            testEnded: false,
            totalTestTime: 0,
            timeLeft: 0
        },
        // 2
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
        // 3
        words: {
            currentWordIndex: 0,
            testWords: [],
            currentWord: {}
        },
    };
    // current WORD CONSTRUCTOR vs right Word from Text provided
//    {
//      value: {correct: '', user: '' , isCorrect: false },
//      characters: {correct: [], user: [], totalCorrect: 0, totalTest: 0 }
//    }

    const word = function(index){};

    //update method
    word.prototype.update = function(value){};
//------------------------------
    return {
      // PUBLIC GETTERS  ---------------
    //INDICATORS
        setTestTime: function(x){//sets the total test time to x
          appData.indicators.totalTestTime = x;
        },
        initializeTimeLeft: function(){ //m0
          appData.indicators.timeLeft = appData.indicators.totalTestTime
        },
        startTest: function(){},//starts the test

        endTest: function(){},//ends the test

        getTimeLeft: function(){//return the remaining test time
          return appData.indicators.timeLeft;
        },

        reduceTime: function(){},// reduces the time by one sec

        timeLeft: function(){},//checks if there is time left to continue

        testEnded: function(){},//checks if the test has already ended

        testStarted: function(){},//checks if the test has started

        //RESULTS
        calculateWpm: function(){},//calculates wpm and wpmChange and updates them in appData

        calculateCpm: function(){},//calculates cpm and cpmChange and updates them in appData

        calculateAccuracy: function(){},//calculates accuracy and accuracyChange and updates them in appData

        // WORDS
        // fills words.testWords
        fillListOfTestWords: function(textNumber, words){
            var result = words.split(" ");
            appData.words.testWords = result;
        },
        // get list of test words: words.testWords
        getListofTestWords: function(){
            return appData.words.testWords;
        },

        moveToNewWord: function(){},// increments the currentWordIndex - updates the current word (appData.words.currentWord) by creating a new instance of the word class - updates numOfCorrectWords, numOfCorrectCharacters and numOfTestCharacters

        updateCurrentWord: function(value){},// updates current word using user input

        getLineReturn(){
            return lineReturn;
        },

        returnData(){
            console.log(appData);
        }

    }

})();
