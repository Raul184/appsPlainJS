console.log('works?');
// 1.  MODULE UI
const uiController = function(){
    let domStrings = {
       form : document.querySelector('#task-form'), //form
       taskList : document.querySelector('.collection'),
       clearBtn : document.querySelector('.clear-tasks'), //filter btn
       filter : document.querySelector('#filter'), //input for filter
       taskInput : document.querySelector('#task') //add/subm task btn
  };
  return{
    // 1. UI required selectors
    getDomStrings: function() {
      return domStrings;
    },
    // 2. GET Input from UI
    getInput: function(){
        if(domStrings.taskInput.value === ''){
            return ' ';
        }else{
          //Create a li element
          const li = document.createElement('li');
          //Add a class
          li.classList.add('collection-item');
          //Create text and append
          li.appendChild(document.createTextNode(domStrings.taskInput.value));
          //Create delete-link element
          const link = document.createElement('a');
          // Add class
          link.classList.add('delete-item');
          // Add Icon
          link.innerHTML = '<i class= "fa fa-remove"></i>';
          li.appendChild(link);
          // Now , append Li to ul
          domStrings.taskList.appendChild(li);
          // Clear input
          domStrings.taskInput.value = ' ';
        }
    }
  }
}(); //UI controller ends


// 2.  MODULE GController----------------------------
const globalController =  function(ui) {
    const addTask = function(e){
      console.log(e)
        let input;
    // 1 Get task input from UI
        input = ui.getInput();
        console.log(input);
        e.preventDefault();
    }
    return{
        init: function() {
        // 1 DOM
            let dom = ui.getDomStrings();
         // 2 EventListeners
            dom.form.addEventListener('submit', addTask);
     }
   }
}(uiController);
// INIT
globalController.init();
