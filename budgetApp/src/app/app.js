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
    const x = 23;
    const add = function(a){
      return x + a;
    }
    return {
      publicTest: function(b){
        return add(b);
      }
    }
}();

// MODULE 2: UI MODULE
const uiController = function(){

}();

// BRIDGE BETWEEN OUR DATA MODULE & UI MODULE ABOVE
const controller =  function(budget, ui){
    let secondTest = budget.publicTest(5);
    return{
      anotherPublicTest: function(){
        console.log(secondTest);
      }
    }
}(budgetController, uiController);
