// FUNCTIONAL DESIGN
const UIModule = (function(){
    // PRIVATE
    const DOMstrings = {//dom Strings
        //indicators - test control
        timeLeft : document.getElementById('timeLeft'),
        //test results
        // wpm,wpmChange,cpm,cpmChange,accuracy,accuracyChange,
        // //user input
        // textInput,nameInput,
        //test words
        content: document.getElementById('content'),
        activeWord: ' '
        //modal
        // modal
    };
    const addSpace = function(array){
      array.push(' ');
      return array;
    };
    const addSpanTags = function (array){
        return array.map(function(current){
             return `<span>${current}</span>`;
        });
    };
    const addWordSpanTags = function(array){
        array.unshift('<span>');
        array.push('</span>');
        return array;
    };
    const joinAll = function(array){
        return array.join(' ');
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
          let result = arrStr.map(function(str){
            return str.split(' ');
          });
          result.map(addSpace);
          // [chars + span tags]
          result = result.map(addSpanTags);
          //span[chars + span]</span>
          // result = result.map(addWordSpanTags);
          result = result.map(joinAll);
          // bundle all together
          result.join(' ');
          console.log(result);
          DOMstrings.content.innerHTML = result;
        },

        formatWord: function(wordObject, wordHTML){},

        setActiveWord: function(index){},

        deactivateCurrentWord: function(){},

        scroll: function(){}

    }
})();
