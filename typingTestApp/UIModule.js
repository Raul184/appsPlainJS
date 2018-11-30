// FUNCTIONAL DESIGN
const UIModule = (function(){
    // PRIVATE
    const DOMstrings = {//dom Strings
        //indicators - test control
        timeLeft : document.getElementById('timeLeft'),
        //test results
        wpm,wpmChange,cpm,cpmChange,accuracy,accuracyChange,
        //user input
        textInput,nameInput,
        //test words
        content: document.getElementById('content'),
        activeWord,
        //modal
        modal
    };

    return {
      // PUBLIC
    //get DOM elements

        getDOMElements(){},

    //INDICATORS - Test Control

        updateTimeLeft: function(){},

    //RESULTS

        updateResults: function(){},

        fillModal: function(){},

        showModal: function(){},

    //USER INPUT

        inputFocus: function(){},

        isNameEmpty: function(){},

        flagNameInput: function(){},

        spacePressed: function(){},


        enterPressed: function(){},

        emptyInput: function(){},

        getTypedWord: function(){},

    //TEXT PROVIDED , WORDS
        fillContent: function(arrStr){
          //arr of characters/word
          let result = arrStr.map(splitArr(str){
            return str.split(' ');
          })
          DOMstrings.content.textContent = result;
        },

        formatWord: function(wordObject, wordHTML){},

        setActiveWord: function(index){},

        deactivateCurrentWord: function(){},

        scroll: function(){}

    }
})();
