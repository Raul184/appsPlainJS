console.log('works?');
//Budget App                                        ARQUITECTURE
// TASKS LIST
// - Event handlers                                 Module 1: UI Module
// - Get input                                                Add input into calculations structure
// - Add input into calcule structure            Calculate Budget
// Add input to UI                                 Module 2: Data Module
// Calculate budget                                      Get input
// Update UI                                                Add input to UI
//                                                                  Update UI
//                                                          Module 3: CONTROLLER
//                                                                 Event handlers
//---------------------------------------------------------------------
// GLOBAL SCOPE
// MODULE 1: DATA MODULE
const budgetController = function(){
      const Expense = function(id, description, value){
          this.id = id;
          this.description = description;
          this.value = value;
      };
      const Income = function(id, description, value){
          this.id = id;
          this.description = description;
          this.value = value;
      };
      // DATABASE ARQUITECTURE
      const data = {
          allItems: {
                exp: [],
                inc: []
          },
          totals : {
               exp: 0,
               inc: 0
          },
          budget: 0,
          percentage: 0
      };
      return{
        //1 ADD into DATABASE method
        addItem: function (type, des, val){
            var item, iD;
                                  //1.  iD assignator
            if(data.allItems[type].length > 0 ){
            iD = data.allItems[type][data.allItems[type].length -1].id + 1;
          }else{ iD = 0} //when there's no Items , Id in Stock = 0;
                                  //2.   Stock Classifier
            if (type === 'exp'){ item = new Expense(iD , des, val); }
            else if (type === 'inc'){ item = new Income(iD , des, val); }
                                          //and then push it to Storage
            data.allItems[type].push(item);
            return item;
        },
        // 2 REMOVE selected ITEM
        removeItem: function(type, id){
          let ids, locator;
            //check Ids and find the selected one
            ids = data.allItems[type].map(function(current) {return current.id});
            locator = ids.indexOf(id);
            // remove selected id (item)
            if(locator !== -1){
                data.allItems[type].splice(locator, 1);
                }
        },
        //3 CALCULATE Expenses from DATABASE method
        calculatorExp: function(){
            let expenses;
            expenses = data.allItems.exp.map(exP => { return exP.value});
            data.totals.exp = expenses.reduce((acc, value) => {return acc += value}, 0);
            return data.totals.exp;
        },
        //4 CALCULATE Income from DATABASE method
        calculatorInc: function(){
            let income;
            income = data.allItems.inc.map(inC => { return inC.value});
            data.totals.inc = income.reduce((acc, value) => { return acc += value}, 0);
            return data.totals.inc;
        },
        // 5 CALCULATE TOTALS
        calculatorTotal: function(){
            data.budget = data.totals.inc - data.totals.exp;
            return data.budget;
        },
        // 6 PERCENTAGE
        percentageCalculator: function(){
            if(data.totals.inc > 0 ){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
                return `${data.percentage}%` ;
            } else { data.percentage = -1;}
        }
      } //return for budgetController
}();

// MODULE 2: UI MODULE
const uiController = function () {
      let domStrings = {
          inputType: '.add__type',
          inputDescription: '.add__description',
          inputValue: '.add__value',
          inputButton: '.add__btn',
          incomeList: '.incomeList',
          expensesList: '.expensesList',
          budgetIncome: '.budget__income--value',
          budgetExpenses: '.budget__expenses--value',
          budgetTotal: '.budget__value',
          percentage: '.budget__expenses--percentage'
      };

      return{
        //optional
            getDomStrings :  function() {
                return domStrings;
            },
        // 1. Get INPUT Method
            getInput : function() {
                return {
                    type : document.querySelector(domStrings.inputType).value, //inc or exp
                    description : document.querySelector(domStrings.inputDescription).value,
                    value : parseFloat(document.querySelector(domStrings.inputValue).value)  //turn it into a number
                }; //Obj
           },
           // 2. ADD INPUT METHOD
           addListItem : function (obj, type) {
              let html , replaceHtml, element;
                // 2.1  HTML string
                  if( type === 'inc'){
                      element = domStrings.incomeList;
                      html = `<div class=' item ' id='inc-%id%'><div class=' item__description blue '>%description%</div>
                      <div class=' item__value blue '>%value%</div><button class="item__delete--btn blue"><i class="ion-ios-close-outline">
                      </i></button></div>` ;
                    } else if( type === 'exp'){
                      element = domStrings.expensesList;
                      html = `<div class="item" id="exp-%id%"><div class=" item__description">%description%</div>
                      <div class="item__value">%value%</div><div class="item__percentage">21%</div><button class="item__delete--btn red">
                      <i class="ion-ios-close-outline"></i></button></div>` ;
                    }
                //  2.2 Populate inputs from user
                  replaceHtml = html.replace('%id%', obj.id);
                  replaceHtml = replaceHtml.replace('%description%', obj.description);
                  replaceHtml = replaceHtml.replace('%value%', obj.value);
                //  2.3 Put REPLACED STRINGS back into the DOM
                  document.querySelector(element).insertAdjacentHTML('beforeend', replaceHtml);
           },
           // 3. UI CLEAR INPUT Method
           clearFields: function() {
                let fields, fieldsCreatedArr;
                // 3.1 fields selected
                fields = document.querySelectorAll(domStrings.inputDescription + ', ' + domStrings.inputValue); //Nodes List
                  // 3.2 fields Converted into an Array
                fieldsCreatedArr = Array.from(fields);  //ES6
                 // 3.3 Erase every value when methos is called upon
                 fieldsCreatedArr.forEach(function (current, index, arr){
                      current.value = ' ';
                 });
                    // 3.4 Keep focus on input fields for User
                  fieldsCreatedArr[0].focus();
           },
           // 4. UPDATE INC & EXP on UI interface
           updateBudget: function(a, b, c, d) {
             let updateInc , updateExp, updateTotal, percentage;
             updateInc = document.querySelector(domStrings.budgetIncome);
             updateExp = document.querySelector(domStrings.budgetExpenses);
             updateTotal = document.querySelector(domStrings.budgetTotal);
             percentage = document.querySelector(domStrings.percentage);
             updateInc.textContent = a;
             updateExp.textContent = b;
             updateTotal.textContent = c;
             percentage.textContent = d;
           }
    }; // RETURN UICONTROLLER
}(); //UICONTROLLER


// BRIDGE BETWEEN              DATA  & UI  MODULES ABOVE
const globalController =  function(budget, ui){
  // 1
          // Add Input from UI
          const addItem = function(){
              let input, inputInStock;
            // 1 Get input
              input = ui.getInput();

              if ( input.description  != " "  &&  !isNaN(input.value)  &&  input.value > 0 ){
              // 2 Storage Input
              inputInStock = budget.addItem(input.type, input.description, input.value);
              //3 Add item to UI
              ui.addListItem(inputInStock, input.type);
              //4 Empty item just added to UI
              ui.clearFields();
              //5 Update UI with Inc & Budget totals at TOP section
              ui.updateBudget(budget.calculatorInc(), budget.calculatorExp(), budget.calculatorTotal(), budget.percentageCalculator());
              }
        };
// 2
        const deleteItem = function(e){
            let itemSelected, splitId, typeId, itemId;
            // raw - input
            itemSelected = e.target.parentNode.id;   //id item logged when button is clicked
            splitId = itemSelected.split('-');
            typeItem = splitId[0];  //for the type
            itemId = parseInt(splitId[1]);   // for the id of item within type
            // 1 delete Item from dataBase
            budget.removeItem(typeItem, itemId);
            // 2 delete from UI
            document.querySelector(`#${typeItem}-${itemId}`).style.display = 'none';
            // 3 update & show new budget
            ui.updateBudget(budget.calculatorInc(), budget.calculatorExp(), budget.calculatorTotal(), budget.percentageCalculator());
        }
          return{
              init: function(){
                  console.log('Application initiated');
                  // Strings Availability
                  let dom = ui.getDomStrings();
                  // EVENT LISTENERS
                  // 1.Input-takers
                  document.querySelector(dom.inputButton).addEventListener('click', addItem);
                  document.addEventListener('keypress', function(e){
                      if(e.keyCode === 13  || e.which === 13){
                          addItem();
                      }
                  });
                  // 2. Event delegation
                  document.querySelector('.container').addEventListener('click', deleteItem);
            } //init ENDS
          }

}(budgetController, uiController);
//INIT
globalController.init();
