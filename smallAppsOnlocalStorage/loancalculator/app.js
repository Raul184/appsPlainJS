const uiController = function(){
// DOM selectors
    let domStrings = {
       form : document.querySelector('#loan-form'), //form
       amount : document.querySelector('#amount'),// loan
       interest : document.querySelector('#interest'),//
       years : document.querySelector('#years'), //
       monthlyPayment : document.querySelector('#monthly-payment'),//
       totalPayment: document.querySelector('#total-payment'),
       totalInterest : document.querySelector('#total-interest')
  };
  return{ //RETURN
    getDomStrings: function() {
      return domStrings;
    },
    calculation: function() {
      // MONTANTS
        const principal = parseFloat(domStrings.amount.value);//decimals
        const calcPaymt = parseFloat(domStrings.years.value) * 12;
        const calcIntrest = parseFloat(domStrings.interest.value)/100/ 12;
        // CALCULATIONS
        const x = Math.pow(1 + calcIntrest , calcPaymt);
        const monthly = ( principal*x*calcIntrest)/(x -1);
        // Validations
        if(isFinite(monthly)){
            domStrings.monthlyPayment.value = monthly.toFixed(2);
            domStrings.totalPayment.value = (monthly * calcPaymt).toFixed(2);
            domStrings.totalInterest.value = ((monthly* calcPaymt) - principal).toFixed(2);
        }else {
            console.log('please check');
        }
    },
      showError: function(error){
          const errorDiv = document.createElement('div');
          errorDiv.className = 'alert alert-danger' //bootstrap
          errorDiv.appendChild(document.createTextNode(error)); //add text
          
      }
  } //return for uiController
}();
//---------------------------------------------------
const globalController =  function(ui) {
    const calculateResults = (e) => {
        ui.calculation();
        e.preventDefault();
    }
    return{
        init: function() {
        // 1 DOM
            let dom = ui.getDomStrings();
         // 2 EventListeners
            // localStorage on UI
            dom.form.addEventListener('submit', calculateResults); //calc
            // dom.amount.addEventListener('click', removeTask);//
            // dom.clearBtn.addEventListener('click', clearAll);//
            // dom.filter.addEventListener('keyup', filterTasks);
          }
    }
}(uiController);
// INIT
globalController.init();
//---------------------------------------------------
