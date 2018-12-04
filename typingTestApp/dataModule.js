const dataModule = (function(){
// PRIVATE
    let lineReturn = '|';
    const appData = {
        indicators: {
            testStarted: false, testEnded: false, totalTestTime: 0, timeLeft: 0
        },
        results: {
            wpm: 0, wpmChange: 0, cpm: 0, cpmChange: 0, accuracy: 0, accuracyChange: 0 ,   numOfCorrectWords: 0, numOfCorrectCharacters: 0 , numOfTestCharacters: 0
        },
        words: {
            currentWordIndex: -1, testWords: [], currentWord: {}
        },
    };
// WORDS SAVER
    const word = function(index){
        //word values: correct vs user's
        this.value = {
            correct: appData.words.testWords[index] + ' ',
            user: '',
            isCorrect: false
        };
        //characters: correct vs user's
        this.characters = {
            correct: this.value.correct.split(''),
            user: [],
            totalCorrect: 0,
            totalTest: this.value.correct.length
        };
    };
// CHARS CLASSIFICATOR
    let nbCorrectChar;
    const charCallback = function(currentElement, index){
          nbCorrectChar += (currentElement == this.characters.user[index])? 1 : 0;
      };
// USER-WORDS CLASSIFICATOR
    //update method: updates the word using the word typed by the user
    word.prototype.update = function(value){
        //update the user input
        this.value.user = value;
        //update the words status (correct or not)
        this.value.isCorrect = (this.value.correct == this.value.user);
        //update user characters
        this.characters.user = this.value.user.split('');
        //calculate the number of correct characters
        //correct: ['w', 'o', 'r', 'd']
        //user: ['w', 'o', 'o', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
        nbCorrectChar = 0;

        let charCallback2 = charCallback.bind(this);
        this.characters.correct.forEach(charCallback2);

        this.characters.totalCorrect = nbCorrectChar;

    };
//--------------------
    return {
// PUBLIC GETTERS
// 1. TIME SET
        setTestTime: function(x){
            appData.indicators.totalTestTime = x;
        },
        //initializes time left to the total test time
        initializeTimeLeft: function(){
            appData.indicators.timeLeft = appData.indicators.totalTestTime;
        },

        startTest: function(){},//starts the test

        endTest: function(){},//ends the test

        //return the remaining test time
        getTimeLeft: function(){
            return appData.indicators.timeLeft;
        },

        reduceTime: function(){},// reduces the time by one sec

        timeLeft: function(){},//checks if there is time left to continue the test

        //checks if the test has already ended
        testEnded: function(){
            return appData.indicators.testEnded;
        },

        testStarted: function(){},//checks if the test has started

// 2. RESULTS CALCULATOR
        calculateWpm: function(){},//calculates wpm and wpmChange and updates them in appData

        calculateCpm: function(){},//calculates cpm and cpmChange and updates them in appData

        calculateAccuracy: function(){},//calculates accuracy and accuracyChange and updates them in appData

    //test words

        // fills words.testWords
        fillListOfTestWords: function(textNumber, words){
            var result = words.split(" ");
            appData.words.testWords = result;
        },

        // get list of test words: words.testWords
        getListofTestWords: function(){
            return appData.words.testWords;
        },

        // increments the currentWordIndex - updates the current word (appData.words.currentWord) by creating a new instance of the word class - updates numOfCorrectWords, numOfCorrectCharacters and numOfTestCharacters
        moveToNewWord: function(){
            if(appData.words.currentWordIndex > -1){

                //update the number of correct words

                //update number of correct characters

                //update number of test characters

            }
            appData.words.currentWordIndex ++;
            var currentIndex = appData.words.currentWordIndex;
            var newWord = new word(currentIndex);
            appData.words.currentWord = newWord;
        },

        //get the current word index
        getCurrentWordIndex(){
            return appData.words.currentWordIndex;
        },

        //get current word
        getCurrentWord(){
            var currentWord = appData.words.currentWord;
            return {
                value: {
                    correct: currentWord.value.correct,
                    user: currentWord.value.user
                }
            };
        },

        // updates current word using user input
        updateCurrentWord: function(value){
            appData.words.currentWord.update(value);
        },

        getLineReturn(){
            return lineReturn;
        },

        returnData(){
            console.log(appData);
        }

    }

})();
