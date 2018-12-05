const dataModule = (function(){
// PRIVATE
    //callback to calculate number of correct chars inside typed-currentWord
// 1.  DATABASE
    const appData = {
        indicators: {
            testStarted: false,
            testEnded: false,
            totalTestTime: 0,
            timeLeft: 0
        },
        results: {
            wpm: 0, wpmChange: 0, cpm: 0, cpmChange: 0, accuracy: 0, accuracyChange: 0 ,   correctWords: 0, correctChars: 0 , testChars: 0
        },
        words: {
            currentWordIndex: -1,
            testWords: [],
            currentWord: {}
        },
    };
//2.  WORDS TYPED BY USER ---CONSTRUCTOR
    let word = function(index){
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
// 3. CHARS CORRECTOR
        let nbCorrectChar;
        let charCallback = function(currentElement, index){
              nbCorrectChar += (currentElement == this.characters.user[index])? 1 : 0;
          };
// 4. JIT STORAGE SYSTEM FOR USER-WORDS
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
    return {
// PUBLIC SECTION
    //INDICATORS
//sets the total test time to x
        setTestTime: function(x){
            appData.indicators.totalTestTime = x;
        },
//initializes time left to the total test time
        initializeTimeLeft: function(){
            appData.indicators.timeLeft = appData.indicators.totalTestTime;
        },
//starts the test
        startTest: function(){
            appData.indicators.testStarted = true;
        },
//ends the test
        endTest: function(){
            appData.indicators.testEnded = true;
        },
//return the remaining test time
        getTimeLeft: function(){
            return appData.indicators.timeLeft;
        },
// reduces the time by one sec
        reduceTime: function(){
            appData.indicators.timeLeft --;
            return appData.indicators.timeLeft;
        },
//checks if there is time left to continue the test
        timeLeft: function(){
            return appData.indicators.timeLeft != 0;
        },
//checks if the test has already ended
        testEnded: function(){
            return appData.indicators.testEnded;
        },
//checks if the test has started
        testStarted: function(){
            return appData.indicators.testStarted;
        },

    //RESULTS
//calculates wpm and wpmChange and updates them in appData
        calculateWpm: function(){
            var wpmOld = appData.results.wpm;
            var numOfCorrectWords = appData.results.correctWords;
            if(appData.indicators.timeLeft != appData.indicators.totalTestTime){
                appData.results.wpm = Math.round(60 * numOfCorrectWords/(appData.indicators.totalTestTime - appData.indicators.timeLeft));
            }else{
                appData.results.wpm = 0
            }
            appData.results.wpmChange = appData.results.wpm - wpmOld;

            return [appData.results.wpm, appData.results.wpmChange];
        },
//calculates cpm and cpmChange and updates them in appData
        calculateCpm: function(){
            var cpmOld = appData.results.cpm;
            var numOfCorrectCharacters = appData.results.correctChars;
            if(appData.indicators.timeLeft != appData.indicators.totalTestTime){
                appData.results.cpm = Math.round(60 * numOfCorrectCharacters/(appData.indicators.totalTestTime - appData.indicators.timeLeft));
            }else{
                appData.results.cpm = 0
            }
            appData.results.cpmChange = appData.results.cpm - cpmOld;
            return [appData.results.cpm, appData.results.cpmChange];
        },
//calculates accuracy and accuracyChange and updates them in appData
        calculateAccuracy: function(){
            var accuracyOld = appData.results.accuracy;
            var numOfCorrectCharacters = appData.results.correctChars;
            var numOfTestCharacters = appData.results.testChars;
            if(appData.indicators.timeLeft != appData.indicators.totalTestTime){
                if(numOfTestCharacters != 0){
                    appData.results.accuracy = Math.round(100 * numOfCorrectCharacters/numOfTestCharacters);
                }else{
                    appData.results.accuracy = 0
                }
            }else{
                appData.results.accuracy = 0;
            }
            appData.results.accuracyChange = appData.results.accuracy - accuracyOld;

            return [appData.results.accuracy, appData.results.accuracyChange];
        },

    //TEXTS PROVIDER
// fills words.testWords
        fillListOfTestWords: function(textNumber, words){
            var result = words.split(" ");
            // if(textNumber == 0){
            //     //shuffle words
            //     result = shuffle(result);
            //     //capitalise random strings
            //     result = capitalizeRandom(result);
            //     //add a random punctuation
            //     result = addRandomPunctuation(result);
            // }
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
                if(appData.words.currentWord.value.isCorrect == true){
                    appData.results.correctWords ++;
                }
//update number of correct characters
                appData.results.correctChars += appData.words.currentWord.characters.totalCorrect;
//update number of test characters
                appData.results.testChars += appData.words.currentWord.characters.totalTest;
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
            let currentWord = appData.words.currentWord;
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
        returnData(){
            console.log(appData);
        }
    }
})();
