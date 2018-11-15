console.log('works?');
//Budget App
// TASKS LIST
// - Event handlers
// - Get input
// - Add input into calcule structure
// Add input to UI
// Calculate budget
// Update UI
//--------------
// ARQUITECTURE
// Module 1: UI Module------------------
// - Get input
// Add input to UI
// Update UI
// Module 2: Data Module----------------
// - Add input into calcule structure
// Calculate budget
// Module 3: CONTROLLER-----------
// - Event handlers
//---------------------------------------------------------------------
// GLOBAL SCOPE

// MODULE 1: DATA MODULE
const budgetController = function(){

}();

// MODULE 2: UI MODULE
const uiController = function(){

}();




// BRIDGE BETWEEN OUR DATA MODULE & UI MODULE ABOVE
const globalController =  function(budget, ui){
  // Add Input from UI
  const addItem = function(){
      console.log('it works');
  }
  // 1.ADD button on CLICK-----------------
    document.querySelector('.add__btn').addEventListener('click', addItem);
    // 1 ADD functionality on pressed ENTER------------
    document.addEventListener('keypress', function(e){
        if(e.keyCode === 13  || e.which === 13){
            addItem();
          }
    })



}(budgetController, uiController);
