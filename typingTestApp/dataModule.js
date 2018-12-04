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
            currentWordIndex: -1, //incrementer f()
            testWords: [],
            currentWord: {}
        },
    };
    // current WORD CONSTRUCTOR
    let word = function(index){
        // MATCH user WORDS vs right ones from text provided
        this.value = {
            correct : appData.words.testWords[index] + ' ',
            userInput: ' ',
            isCorrect: false
        };
        // MATCH user characters on everyWord input vs right words
        this.characters = {
            correct : this.value.correct.split(''),
            userInput: [],
            totalCorrect: 0,
            totalCharsWord: this.value.correct.length
        };
    };
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
        // fills database
        textsProvider: function(textNumber, words){
            var result = words.split(" ");
            appData.words.testWords = result;
        },
        // texts array
        getListofTestWords: function(){
            return appData.words.testWords;
        },
        //Words follower and matcher
        moveToNewWord: function(){
            appData.words.currentWordIndex ++ ;
            let index = appData.words.currentWordIndex;
            let inputWord = new word(index); // every word input
            appData.words.currentWord = inputWord; //storage
        },
        //provide CURRENT WORD index
        getCurrentWordIndex: function(){
          return appData.words.currentWordIndex;
        },
        getCurrentWord: function(){
          let extractor = appData.words.currentWord; //word
          return { //a copy of our private DB obj
            value: {
              correct: extractor.value.correct ,
              user: extractor.value.user
            }
          }
        },
        updateCurrentWord: function(value){},// updates current word using user input

        getLineReturn(){
            return lineReturn;
        },

        returnData(){
            console.log(appData);
        }

    }

})();
