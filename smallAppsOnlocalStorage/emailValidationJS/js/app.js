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

      if(DOM.mail.value !== ''  && DOM.asunto.value !== '' && DOM.message.value !== ''){
            DOM.enviar.disabled = false;
      }
    },
    sentMail: function(e){
      const spinnerGif = document.querySelector('#spinner');
      spinnerGif.style.display = 'block';
      //mail gif
      const enviado = document.createElement('img');
      enviado.src = 'img/mail.gif';
      enviado.style.display = 'block';
      //animation
      setTimeout(function() {
        spinnerGif.style.display = 'none';

        document.getElementById('loaders').appendChild(enviado);
      }, 3000);

      e.preventDefault();
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
      dom.enviar.addEventListener('click', ui.sentMail);
    }
  }
})();
ev.init();
