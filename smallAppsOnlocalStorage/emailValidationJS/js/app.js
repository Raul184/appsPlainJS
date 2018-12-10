// UI Module
const ui = (function (){
// PRIVATE
  const DOM ={
    mail: document.getElementById('email'),
    asunto: document.getElementById('asunto'),
    message: document.getElementById('mensaje'),
    enviar: document.getElementById('enviar')
  }
  return{
// PUBLIC
    getDom: function(){
      return DOM;
    }
  }
})();


// DATA Module
const data = (function(){
  let str = ui.getDom();
  return{
    inicioApp: function(){
      str.enviar.disabled = true;
    }
  }
})();


// EVENT Listeners Module
const ev = (function(){
  return{
    init: function(){
      //init y disable submit
      document.addEventListener('DOMContentLoaded', data.inicioApp);
    }
  }
})();
ev.init();
