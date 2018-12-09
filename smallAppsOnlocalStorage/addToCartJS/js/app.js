// DATA Module
const stock = (function(){
// Private
  const DOM = {
    // cart
    addcart: document.getElementById('carrito'),
    //container for All Courses
    courses: document.getElementById('lista-cursos'),
    // display courses added to cart
    cart: document.querySelector('#lista-carrito tbody')
  }
  return{
    getDom: function(){
      return DOM;
    }
  }
})();




// UI Module
const UI = (function (){
// Private
  let domStrings = stock.getDom();
  const courseFormatter = function(el){
    const infoCurso = {
      img: el.querySelector('img').src,
      title: el.querySelector('h4').textContent,
      price: el.querySelector('.precio span').textContent,
      id: el.querySelector('a').getAttribute('data-id')//customized HTML5 id
    }
    return infoCurso;
  }
  const courseAdderUI = function(el){
// domStrings.cart
// HTML element creations
    const row = document.createElement('tr'); //tr
    row.innerHTML =`
        <td>
            <img src="${el.img}" width=100>
        </td>
        <td>${el.title}</td>
        <td>${el.price}</td>
        <td>
            <a href ="#" class="delete-button" data-id="${el.id}">X</a>
        </td>
        `;
// Appending
    domStrings.cart.appendChild(row);
  }
  return{
    buyCourse: function(e){
// avoid default behavior
      e.preventDefault();
// trigger ED just when click on
      if(e.target.classList.contains('agregar-carrito')){
//select required item/info from course
        const curso = e.target.parentElement.parentElement;
// get & format course data
        let input = courseFormatter(curso);
// + to cart selected courses
        courseAdderUI(input);
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
