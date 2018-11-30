const eventsModule = (function(dModule, uModule, cModule, wModule){
    const addEventListeners = function(){

        //character typing event listener

        //click on download button event listener

        //click on restart button event listener

    };


    return {
        //init function, initializes the test before start
        init: function(duration, textSelector){
          // 1. PROVIDE TEXT for dataModule
          const wordsArr = wModule.getWords(textSelector);//*get data here so I avoid connexions between data & words module as to meet "Module patter design principles".
          dModule.textProvider(textSelector, wordsArr);
          // provide text on uiM
          let wordsArrII = dModule.getListofWordsTest();
          uiModule.fillContent(wordsArrII);
          // set time for test

          // time updates dataM

          // time updates uiM

          // highlight words runs dataM

          // activeWord UImodule

          // fortmatActiveWord UIModule

          // focus on Text input from user

          // eventListeners
            addEventListeners();
        }
    };

})(dataModule, UIModule, certificateModule, wordsModule);
