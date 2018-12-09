// DATA Module
const stock = (function(){
// Private
  const DOM = {
    addcart: document.getElementById('carrito'),
    courses: document.getElementById('lista-cursos')
  }
  return{
    getDom: function(){
      return DOM;
    }
  }
})();




// UI Module
const UI = (function (){
  let domStrings = stock.getDom();
  return{
    buyCourse: function(e){
// avoid default behavior
      e.preventDefault();
// trigger just when click on
      if(e.target.classList.contains('agregar-carrito')){
//select required item/info from course
        const curso = e.target.parentElement.parentElement;
// format course data
        courseFormatter(curso);
      };
    }
  }
})();




// EVENT LISTENERS Module
const listen = (function (){
  let dom = stock.getDom();
  return{
    init: function(){
      // Event Delegation for Add To Cart button
      dom.courses.addEventListener('click', UI.buyCourse);
    }
  }
})();
listen.init();
