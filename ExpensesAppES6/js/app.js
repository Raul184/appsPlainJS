// DATA Module
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto); //for method
      }                   //default
    balance(amount = 0){
        return this.restante -= Number(cantidad);
    }
}


class Interfaz{
  insertAmount(amount){
    // Locate
    const presupuesto = document.getElementById('total');
    const restante = document.getElementById('restante');
    // Show on UI
    presupuesto.innerHTML = `${amount}`;
    restante.innerHTML = `${amount}`;
  }
  showMessage(m , t){
    // Dom
    const dom = UI.getDom();
    //html Injection
    const divMessag = document.createElement('div');
    // class & styles
    if(t === 'error'){
      divMessag.classList.add('error-message');
    } else{
      divMessag.classList.add('success-message');
    }
    //add Message
    divMessag.appendChild(document.createTextNode(m))
    // location
    dom.primary.insertBefore(divMessag, dom.form);
  }
}


// UI Module
const UI = (function(){
  const budget = prompt('Please let me know about your weekly budget');
  const DOM = {
    primary: document.querySelector('.primario'),
    form: document.getElementById('agregar-gasto'),
    expenses: document.getElementById('gasto').value,
    amountExp: document.getElementById('cantidad').value,
    agrega: document.querySelector('.btn-primary')
  }
  return{
    getBudget: function(){
      return budget;
    },
    getDom: function(){
      return DOM;
    }

  }//R ends
})();


// Events Listeners Module
const EVI = (function(){
  let budgetE = UI.getBudget();
  //dom
  let domi = UI.getDom();
  return{
    init: function(){
// SET BUDGET
      document.addEventListener("DOMContentLoaded", function(){
        if(budgetE === null || budgetE === '' ){
          window.location.reload(); //reload if User does not input budget
        } else{ //process input (budget)
          console.log('agregado');
          const budgetCheck = new Presupuesto(budgetE); //instantiate budget C
          const interface = new Interfaz(); //instantiate UI C
          // use its method now
          interface.insertAmount(budgetCheck.presupuesto);
        }
      });
// FORM complete?
      domi.form.addEventListener('submit', function(e){
        e.preventDefault();
        const interface = new Interfaz(); //instantiate UI C
        if(expenses/expenses === '' || expenses.amount === ''){
          interface.showMessage('Please fill form out', 'error'); //error
        }else{
          interface.showMessage('Accounted ', 'cool'); //success
        }
        console.log('enviado');
      })
// AGREGGATE EXPENSES
      // domi.agrega.addEventListener('click', aggregates);
    }
  } //R ends
})();
EVI.init();
