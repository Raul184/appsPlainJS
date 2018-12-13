// TO DO LIST APP ON PLAIN JS
// 1. PROCESS DATA INPUT FROM USER
class Data {
  constructor(value){
    this.value = value;
  }
  ready(){
    return this.value;
  }
}

class UI{
  showInput(obj){
    console.log('run Show UI input');
    let input = obj;
    if(input.length != 0){ //NO empty input
    // html Injection
    const li = document.createElement('li'); //li
    const p = document.createElement('p'); //p
    p.value = input; //input passed to injection
    li.innerHTML = `
      <p>${p.value}</p>
      <p><i class="fa fa-pencil-square-o"></i><i class="fa fa-times"></i></p>
      <input class="edit-note" type="text">
      `;
    //location
    const ul = document.getElementById('list');
    ul.appendChild(li); //appending
    }
  }
}

// IIFE FOR EVENT LISTENERS MODULE
const evi = (function(){
  const DOM ={
    input: document.getElementById('add-input'),
    adder: document.getElementById('add-btn')
  }
  return{
    init: function(){
// INPUT ADD
      DOM.adder.addEventListener('click', function(e){
        e.preventDefault();                          //avoid Default
        let input = DOM.input.value;        // input.value
        const accs = new Data(input);     // instantiate Data/inputGet------
        let output = accs.value;      //Class Input  data
        let uiFace = new UI();          //instantiate UI Now------
        uiFace.showInput(output);
        DOM.input.value = '';
      })
// INPUT DELETE
    }
  }
})();
evi.init();
