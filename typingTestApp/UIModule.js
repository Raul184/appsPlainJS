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
// TEXT FORMATTED---------------
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
//---------------
//RIGHT OR WRONG characters
let userValue;
    const classAsignator = function(currentChar, index){
      if( index < userValue.length){
        return (currentChar == userValue[index]) ? 'correctChar' : 'wrongChar' ;
      }
    };
//----------------
    return {
    //get DOM elements
        getDomElements: function(){
          return dom
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

            text = text.map(joinEachWord);
            text = text.join('');
    //<span><span>w</span><span>o</span><span>r</span><span>d</span><span>1</span><span>,</span><span> </span></span><span><span>w</span>...
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
          let correctValue = wordObj.value.correct;//provided vs
          userValue = wordObj.value.userInput; //input by user
          // apply map to the typed Strings to categorize wrong&rigth ones
          const classestyle = Array.prototype.map.call(correctValue ,     classAsignator);
          //find active word CHILDREN
          let foundActive = dom.activeWord;
          let characters = foundActive.children;//HTML collection
          // highlight the rigth/wrong ones
          for (let i = 0;  i < characters.length; i++){
            characters[i].removeAttribute('class'); //clean
            characters[i].className = classestyle[i];
          }
        },

        deactivateCurrentWord: function(){},

        scroll: function(){}
    }
})();
