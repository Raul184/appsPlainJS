// UI Module
const ui = (function (){
// PRIVATE
  const DOM ={
    mail: document.getElementById('email'),
    asunto: document.getElementById('asunto'),
    message: document.getElementById('mensaje'),
    enviar: document.getElementById('enviar')
  }
  const mailValidation = function(campo){
    let str = campo.value; //for mail input
    if(str.indexOf('@') !== -1){
      campo.style.borderBottomColor = 'green';
      campo.classList.remove('error');
    } else{
      campo.style.borderBottomColor = 'red';
      campo.classList.add('error');
    }
  }
  return{
// PUBLIC
    getDom: function(){
      return DOM;
    },
    validation: function(){
      // length
      data.validarLongitud(this);
      // MAIL
      if(this.type === 'email'){
            mailValidation(this);
      }
      // if ALL data is filled
      let errores = document.querySelector('.error'); //3
      if(DOM.mail.value !== ''  && DOM.asunto.value !== '' && DOM.message.value !== ''){
        if(errores.length === 0){
            DOM.enviar.disabled = false;
        }
      }
    }
  }
})();


// DATA Module
const data = (function(){
  let str = ui.getDom();
  return{
    inicioApp: function(){
      str.enviar.disabled = true;
    },
    validarLongitud: function(campo){
      if(campo.value.length > 0){
        campo.style.borderBottomColor= 'green';
        campo.classList.remove('error');
      } else{
        campo.style.borderBottomColor= 'red';
        campo.classList.add('error');
      }
    }
  }
})();


// EVENT Listeners Module
const ev = (function(){
  let dom = ui.getDom();
  return{
    init: function(){
      //init y disable submit
      document.addEventListener('DOMContentLoaded', data.inicioApp);
      //mail validation
      dom.mail.addEventListener('blur', ui.validation);
      dom.asunto.addEventListener('blur', ui.validation);
      dom.message.addEventListener('blur', ui.validation);
    }
  }
})();
ev.init();
