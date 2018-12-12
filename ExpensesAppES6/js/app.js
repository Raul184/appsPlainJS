// DATA Module
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto); //for method
      }                   //default
    balance(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}
//
let cantidadPresupuesto;

class Interfaz{
// INPUT SAVER
  insertAmount(amount){
    // Locate
    const presupuesto = document.getElementById('total');
    const restante = document.getElementById('restante');
    // Show on UI
    presupuesto.innerHTML = `${amount}`;
    restante.innerHTML = `${amount}`;
  }
// INPUT SAVED MESSAGE
  showMessage(m , t){
    // Dom
    const dom = UI.getDom();
    //html Injection
    const divMessag = document.createElement('div');
    // class & styles
    if(t === 'error'){
      divMessag.classList.add('error-message');
    } else if(t === 'cool'){
      divMessag.classList.add('success-message');
    }
    //add Message
    divMessag.appendChild(document.createTextNode(m))
    // location
    dom.primary.insertBefore(divMessag, dom.form);
    setTimeout(function(){
      divMessag.remove();
    }, 1500);
  }
// EXPENSES ADDED ON UI
  attachExpense(name, number){
    //location to insert
    const list = document.querySelector('.list-group');
    // html element
    const li = document.createElement('li');
    li.className = 'expAccounted';
    //html content
    li.innerHTML = `
          ${name}
          $${number}
    `;
    console.log(li);
    // html injection
    list.appendChild(li);
  }
// CALCULATIONS ON BUDGET
    balance(cantidad){
      const restante = document.querySelector('#restante');
      const budgetLeft = cantidadPresupuesto.balance(cantidad);
      restante.innerHTML = `${budgetLeft}`;
      console.log(presupuesto);
    }
}


// UI Module
const UI = (function(){
  const budget = prompt('Please let me know about your weekly budget');
  const DOM = {
    primary: document.querySelector('.primario'),
    form: document.getElementById('agregar-gasto'),
    expense: document.getElementById('gasto'),
    amountExp: document.getElementById('cantidad'),
    restante: document.getElementById('restante'),
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
        let expDescrip = domi.expense.value;
        let expAmount = domi.amountExp.value
        if( expDescrip === '' || expAmount === ''){
          interface.showMessage('Please check your input', 'error'); //error
          expDescrip = '' ;
          expAmount = '' ;
        }else{
          //show on ui
          interface.showMessage('Accounted ', 'cool'); //success
          // set it on budget UI
          interface.attachExpense(expDescrip, expAmount);
          expDescrip = '' ;
          expAmount = '' ;
          //calculations
          const budgetCheck = new Presupuesto(budgetE); //instantiate budget
          budgetCheck.balance(expAmount);
          interface.balance(expAmount);
        }
        console.log('enviado');
      })
    }//init
  } //R ends
})();
EVI.init();
