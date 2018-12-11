class Seguro {
  constructor(marca, año, tipo){
    this.marca = marca;
    this.año = año;
    this.tipo = tipo;
  }
}


// UI Module
const UI = (function(){
  //select options
    const max = new Date().getFullYear(),
           min = max - 20;
    const DOM = {
    form: document.getElementById('cotizar-seguro'),
    anio: document.getElementById('anio'),
    marca: document.getElementById('marca')
  }
  return{
    getDom: function(){
      return DOM;
    },
    select: function(d){
      let years = DOM.anio;
      for (let i = max ;  i >= min;  i--){
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        years.appendChild(option);
      }
    }
  }
})();


// Events Listener Module
const listens = (function(){
  return{
    init: function(){
      // select navigation
      let str = UI.getDom();
      UI.select();
      //listener on form
      str.form.addEventListener('submit', function(e){
        e.preventDefault();
        const option = str.marca;
        // select values
        const selectedOption = option.options[option.selectedIndex].value;
        
      })
    }
  }
})();
listens.init();
