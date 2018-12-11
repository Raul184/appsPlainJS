// DATA Module
class Presuspuesto{
  constructor(presupuesto){
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto); //for method
  }                   //default
  balance(amount = 0){
    return this.restante -= Number(cantidad)
  }
}


// UI Module
const UI = (function(){
  const budget = prompt('Please let me know about your weekly budget');
  return{
    getBudget: function(){
      return budget;
    }

  }//R ends
})();


// Events Listeners Module
const EVI = (function(){
  let budgetEv = UI.getBudget();
  return{
    init: function(){
      document.addEventListener("DOMContentLoaded", function(){
        if(budgetEv === null || budgetEv === '' || typeof budgetEv !== 'number'){
          window.location.reload(); //reload if User does not input budget
        } else{ //process input
          console.log('agregado');
        }
      });
    }
  } //R ends
})();
EVI.init();
