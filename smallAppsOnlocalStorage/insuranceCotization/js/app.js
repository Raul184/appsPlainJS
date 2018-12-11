class Seguro {
  constructor(marca, año, tipo){
    this.marca = marca;
    this.año = año;
    this.tipo = tipo;
  }
}
Seguro.prototype.cotizarSeguro = function(info){
  let cantidad;
  const annual = 2000;
  switch(this.marca){
    case '1':
      cantidad = annual * 1.15;
      break;
    case '2':
      cantidad = annual * 1.15;
      break;
    case '3':
      cantidad = annual * 1.15;
      break;
  }
  console.log(cantidad);
}
// To instantiate
function Interfaz(){}

Interfaz.prototype.showError = function(message, tipo){
  const div = document.createElement('div');
  if(tipo === 'error'){
    div.classList.add('mensaje', 'error');
  } else{
    div.classList.add('mensaje', 'correcto');
  }
  //append text
  div.innerHTML = `${message}`;
  //append to Html element
  const parent = UI.getDom().form;
  parent.insertBefore(div, document.querySelector('.form-group'));
  //time out for error message
  setTimeout(function(){
    document.querySelector('.mensaje').remove();
  },3000)
}

//-----------------------------------
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
        // select values for Marca
        const option = str.marca;
        // selected values for Marca
        const selectedOption = option.options[option.selectedIndex].value;
        // select for Years
        const year = str.anio;
        const selectedYear = year.options[year.selectedIndex].value;
        //radio button
        const tipo = document.querySelector('input[name="tipo"]:checked').value;
        const instanciar = new Interfaz();
        // CHECK
        if(selectedOption === '' || selectedYear === '' || tipo === ''){
          instanciar.showError("Please, complete all fields" , 'error');
        }else{
          const seguro = new Seguro(selectedOption, selectedYear, tipo);
          // CALCULATIONS
          const cantidad = seguro.cotizarSeguro(seguro);
        }
      })
    }
  }
})();
listens.init();
