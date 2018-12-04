const UIModule = (function(){
// PRIVATE
    const dom = {
        //indicators - test control
        timeLeft:  document.getElementById('timeLeft'),
        //test results
        wpm: document.getElementById('wpm'),
        wpmChange: document.getElementById('wpmChange'),
        cpm: document.getElementById('cpm'),
        cpmChange: document.getElementById('cpmChange'),
        accuracy: document.getElementById('accuracy'),
        accuracyChange: document.getElementById('accuracyChange'),
        //user input
        textInput: document.getElementById('input'),
        nameInput: document.querySelector('.form-group'),
        //test words
        content: document.getElementById('content'),
        activeWord:'',
        //modal
        modal: document.getElementById('myModal')
    };

    const splitArray = function(string){
        return string.split('');
    };

    const addSpace = function(array){
        array.push(' ');
        return array;
    };

    const addSpanTags = function(array){
        return array.map(function(currentCharacter){
            return '<span>' + currentCharacter + '</span>';
        });
    };

    const addWordSpanTags = function(array){
        array.push('</span>');
        array.unshift('<span>');
        return array;
    };

    const joinEachWord = function(array){
        return array.join('');
    };

    return {
    //get DOM elements
        getDomElements: function(){
          return dom;
        },
    //INDICATORS
        // LEFT time updater
        updateTimeLeft: function(x){
          dom.timeLeft.innerHTML = x;
        },

    //RESULTS
        updateResults: function(){},

        fillModal: function(){},

        showModal: function(){},

    //INPUT

        inputFocus: function(){
          dom.textInput.focus();
        },

        isNameEmpty: function(){},

        flagNameInput: function(){},

        spacePressed: function(){},

        enterPressed: function(){},

        emptyInput: function(){},

        getTypedWord: function(){
          console.log(dom.textInput.value);
          return dom.textInput.value;
        },

    //WORDS
// 1 FORMAT & DISPLAY TEXTS PROVIDED
        fillContent: function(array, lineReturn){
            //['word1,', 'word2']
            let text = array.map(splitArray);
            console.log(text);
    //[['w', 'o', 'r', 'd', '1', ',' ], ['w', 'o', 'r', 'd', '2']]
            text = text.map(addSpace);
    //[['w', 'o', 'r', 'd', '1', ',', ' ' ], ['w', 'o', 'r', 'd', '2', ' ']]
            text = text.map(addSpanTags);
            //[['<span>w</span>', '<span>o</span>', '<span>r</span>',
            text = text.map(addWordSpanTags);
    //[['<span>', '<span>w</span>', '<span>o</span>', '<span>r</span>', '<span>d</span>', '<span>1</span>', '<span>,</span>', '<span> </span>', '</span>']
            text = text.map(joinEachWord);
            text = text.join('');
    //<span><span>w</span><span>o</span><span>r</span><span>d</span><span>1</span><span>,</span><span> </span></span><span><span>w</span><span>o</span><span>r</span><span>d</span><span>2</span><span> </span></span>
            //split, join
            text = text.split(`<span>${lineReturn}</span> `).join('<span>&crarr;</span>');
            //fill content
            dom.content.innerHTML = text;
        },
// 2 LOCATE ACTIVE WORD
        setActiveWord: function(index){
          dom.activeWord = dom.content.children[index];
        },
// 3 FORMAT ACTIVE WORD
        // wordObject >> Data Module >> Public Method
        formatWord: function(wordObj){
          //highlight current word
          dom.activeWord.className = 'activeWord';
          //format wrong-typed characters

        },

        deactivateCurrentWord: function(){},

        scroll: function(){}

    }
})();
