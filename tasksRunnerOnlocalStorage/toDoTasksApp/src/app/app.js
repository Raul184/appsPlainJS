console.log('works?');
// 1.  MODULE UI
const uiController = function(){
// DOM selectors
    let domStrings = {
       form : document.querySelector('#task-form'), //form
       taskList : document.querySelector('.collection'),
       clearBtn : document.querySelector('.clear-tasks-btn'), //filter btn
       filter : document.querySelector('#filter'), //input for filter
       taskInput : document.querySelector('#task') //add/subm task btn
  };
  return{
    getDomStrings: function() {
      return domStrings;
    },
// 1. GET Input from UI
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
    },
// 2 REMOVE 1 input
      removeInput: function(b){
          b.target.parentElement.parentElement.remove();
      },
// 3 REMOVE ALL input
      removeAllInput: function(){
          // 1 way to do it
          // domStrings.taskList.innerHTML = ' ';
          // Quickest way to do it
          while(domStrings.taskList.firstChild){
              domStrings.taskList.removeChild(domStrings.taskList.firstChild);
          }
      },
// 4 FILTER
      tasksFilter: function(b){
          let text = b.target.value.toLowerCase();
          document.querySelectorAll('.collection-item').forEach(current => {
              const item = current.firstChild.textContent; //li>textInput
              if(item.toLowerCase().indexOf(text) != -1){
                  current.style.display = 'block';
              } else{ current.style.display = 'none'}
          });
      }
  }
}(); //UI controller ends


// 2.  MODULE GController----------------------------
const globalController =  function(ui) {
// 1 Add a task Function
    const addTask = (e) => {
        ui.getInput();
        e.preventDefault();
    }
// 2 Remove a task Function
    const removeTask = (e) => {
        if(e.target.parentElement.classList.contains('delete-item')){
            ui.removeInput(e);
        }
    }
// 3 Clear all TaskS function
    const clearAll = () => { ui.removeAllInput(); }
// 4 Task Filter on Typing UI
    const filterTasks = (e) => { ui.tasksFilter(e); }
    return{
        init: function() {
        // 1 DOM
            let dom = ui.getDomStrings();
         // 2 EventListeners
            dom.form.addEventListener('submit', addTask); // +  a task
            dom.taskList.addEventListener('click', removeTask);// - a task
            dom.clearBtn.addEventListener('click', clearAll);// - Alltasks
            dom.filter.addEventListener('keyup', filterTasks);// check for
     }
   }
}(uiController);
// INIT
globalController.init();
