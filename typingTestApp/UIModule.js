const UIModule = (function(){
// PRIVATE
    const DOM = {
        //displaying time left
        timeLeft: document.getElementById('timeLeft'), //HTML element
        //test results
        wpm: document.getElementById('wpm'),
        wpmChange: document.getElementById('wpmChange'),
        cpm: document.getElementById('cpm'),
        cpmChange: document.getElementById('cpmChange'),
        accuracy: document.getElementById('accuracy'),
        accuracyChange: document.getElementById('accuracyChange'),
        //user input
        textInput: document.querySelector('#input'),
        nameInput: document.querySelector('.form-group'),
        //test words
        content:document.getElementById('content'),
        activeWord:'',
        //modal
        modal:$('#myModal'),
        download: document.getElementById('download')
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

    let userValue;
    const returnCharClass = function(currentCharacter, index){
                return (index < userValue.length)? (currentCharacter == userValue[index]? 'correctCharacter': 'wrongCharacter') : '0'
            };

    let updateChange = function(value, changeElement){

//determine the class to add to the change element and html content to insert
        let classToAdd, html;
        [classToAdd, html] = (value >= 0)? ['scoreUp', '+' + value] : ['scoreDown', value];

//add % to the percentage change
        if(changeElement == DOM.accuracyChange){
            html += '%';
        }
//update the change element
        changeElement.innerHTML = html;
        //style the change element
        changeElement.removeAttribute('class');
        changeElement.className = classToAdd;
//fade element
        fadeElement(changeElement);
    };

    const fadeElement = function(element){
        element.style.opacity = 1;
        setTimeout(function(){
            element.style.opacity = 0.9;
        }, 100);
    };

    return {
// PUBLIC
        getDOM: function(){
            return {
                textInput: DOM.textInput,
                download: DOM.download
            };
        },

    //Indicators - Test Control
        updateTimeLeft: function(x){
            DOM.timeLeft.innerHTML = x;
        },

    //results
        updateResults: function(results){
            //update wpm
            DOM.wpm.innerHTML = results.wpm;
            //update cpm
            DOM.cpm.innerHTML = results.cpm;
            //update accuracy
            DOM.accuracy.innerHTML = results.accuracy + '%';
            //update changes
            updateChange(results.wpmChange, DOM.wpmChange);
            updateChange(results.cpmChange, DOM.cpmChange);
            updateChange(results.accuracyChange, DOM.accuracyChange);
        },

        fillModal: function(wpm){
            var results;
            if(wpm < 40){
                results = {
                    type: 'turtle',
                    image: 'turtle.jpg',
                    level: 'Beginner'
                };
            }else if(wpm < 70){
                results = {
                    type: 'horse',
                    image: 'horse.jpg',
                    level: 'Average'
                };
            }else{
                results = {
                    type: 'puma',
                    image: 'puma.jpg',
                    level: 'Expert'
                };
            }


            var html = '<div class="result"><p>You are a %type%!</p><p>You type at a speed of %wpm% words per minute!</p><img width="300" height="200" src="images/%image%" class= "rounded-circle" alt=%alt%></div>';

            html = html.replace('%type%', results.type);
            html = html.replace('%wpm%', wpm);
            html = html.replace('%image%', results.image);
            html = html.replace('%alt%', results.type);

            //insert html before form-group
            DOM.nameInput.insertAdjacentHTML('beforebegin', html);

            //store level in download button
            DOM.download.setAttribute('level', results.level);
    
        },

        showModal: function(){
            DOM.modal.modal('show');
        },

    //user input

        inputFocus: function(){
            DOM.textInput.focus();
        },

        isNameEmpty: function(){},

        flagNameInput: function(){},

        // spacePressed: function(event){
        //     return event.data == " ";
        // },

        enterPressed: function(){
            return DOM.textInput.value.includes(' ');
        },

        emptyInput: function(){
            DOM.textInput.value = "";
        },

        getTypedWord: function(){
            console.log(DOM.textInput.value);
            return DOM.textInput.value;
        },

    //test words
        fillContent: function(array, lineReturn){
            //['word1,', 'word2']
            let content = array.map(splitArray);
//[['w', 'o', 'r', 'd', '1', ',' ], ['w', 'o', 'r', 'd', '2']]
            content = content.map(addSpace);
//[['w', 'o', 'r', 'd', '1', ',', ' ' ], ['w', 'o', 'r', 'd', '2', ' ']]
            content = content.map(addSpanTags);
            //[['<span>w</span>', '<span>o</span>', '<span>r</span>',
            content = content.map(addWordSpanTags);
//            console.log(content);
            //[['<span>', '<span>w</span>', '<span>o</span>', '<span>r</span>', '<span>d</span>', '<span>1</span>', '<span>,</span>', '<span> </span>', '</span>'], ['<span>', '<span>w</span>'..., '</span>']]
            content = content.map(joinEachWord);
//            console.log(content);
            content = content.join('');
//            console.log(content);

            //<span><span>w</span><span>o</span><span>r</span><span>d</span><span>1</span><span>,</span><span> </span></span><span><span>w</span><span>o</span><span>r</span><span>d</span><span
            //split, join
            content = content.split('<span>' + lineReturn + '</span>').join('<span>&crarr;</span>');


            //fill content
            DOM.content.innerHTML = content;
        },

        formatWord: function(wordObject){
            let activeWord = DOM.activeWord;
//highlight current word
            activeWord.className = 'activeWord';
//format individual characters
            let correctValue = wordObject.value.correct;
            userValue = wordObject.value.user;
//correct value 'word1 '
//user value 'wwrd'
            let classes = Array.prototype.map.call(correctValue, returnCharClass);
//get active word
            activeWord = DOM.activeWord;
//HTML collection
            let characters = activeWord.children;
//add classes to children
            for(var i = 0; i < characters.length; i ++){
                characters[i].removeAttribute('class');
                characters[i].className = classes[i];
            }
        },

        setActiveWord: function(index){
            DOM.activeWord = DOM.content.children[index];
        },

        deactivateCurrentWord: function(){
            DOM.activeWord.removeAttribute('class');
        },

        scroll: function(){
            var activeWord = DOM.activeWord;
            var top1 = activeWord.offsetTop;
            var top2 = DOM.content.offsetTop;
            var diff = top1 - top2;
            //scroll the content of the content box
            DOM.content.scrollTop = diff - 40;
        }
    }
})();
