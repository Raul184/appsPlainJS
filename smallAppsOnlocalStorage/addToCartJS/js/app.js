// DATA Module
const stock = (function(){
// Private
  // 1. DOM selectos
  const DOM = {
    // cart
    addcart: document.getElementById('carrito'),
    //container for All Courses
    courses: document.getElementById('lista-cursos'),
    // display courses added to cart
    cart: document.querySelector('#lista-carrito tbody'),
    // empty cart
    empty: document.getElementById('vaciar-cart')
  };
  //2. localStorage CHECKER
  const checker = function(){
    let coursesLS;
    if(localStorage.getItem('cursos') === null){
      coursesLS = [];
    } else{
      coursesLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return coursesLS;
  };
  return{
    // 1
    getDom: function(){
      return DOM;
    },
    // 2
    getChecker: function(){
      return checker;
    },
    // 3. LOCALSTORAGE
    saveToLocalStorage: function(el){
        let cursos;
        cursos = checker();
        //+
        cursos.push(el);
        //+ to localStorage API
        localStorage.setItem('cursos', JSON.stringify(cursos));
    },
    removeCourse: function(el){
      let cursoLS;
      // check status
      cursoLS = checker();
      //remove
      cursoLS.forEach((current, index) =>{
        if(current.id === el){
          cursoLS.splice(index, 1);
        }
      }); //update localStorage
      localStorage.setItem('cursos', JSON.stringify(cursoLS));
    }
  }
})();


// UI Module
const UI = (function (){
// Private
//1.  DOM
  let domStrings = stock.getDom();
//2. Courses properly formatted to stock
  const courseFormatter = function(el){
    const infoCurso = {
      img: el.querySelector('img').src,
      title: el.querySelector('h4').textContent,
      price: el.querySelector('.precio span').textContent,
      id: el.querySelector('a').getAttribute('data-id')//customized HTML5 id
    }
    return infoCurso;
  }
//3.  UI courses added
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
    // 1. BUY
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
//localStorage
        stock.saveToLocalStorage(input);
      };
    },
    // 2. REMOVE from Cart
    removeCourse: function(e){
      e.preventDefault();
      let curso;
      if(e.target.classList.contains('delete-button')){//run here
        e.target.parentElement.parentElement.remove(); //remove
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');//custom data-
        stock.removeCourse(cursoId);
      }
    },
    // 3. REMOVE ALL from Cart
    emptyCart: function(e){
      //innerHTML vs whileloops to remove from DOM article
      while(domStrings.cart.firstChild){
        domStrings.cart.removeChild(domStrings.cart.firstChild);
      }
      // from localStorage
      localStorage.clear();
    },
    // 4. DISPLAY items from Cart
    stockDisplayer : function(){
      let courses, checker;
      checker = stock.getChecker();
      courses = checker();//current stock
      courses.forEach((current) =>{
        const row = document.createElement('tr'); //tr
        row.innerHTML =`
            <td>
                <img src="${current.img}" width=100>
            </td>
            <td>${current.title}</td>
            <td>${current.price}</td>
            <td>
                <a href ="#" class="delete-button" data-id="${current.id}">X</a>
            </td>
            `;
    // Appending
        domStrings.cart.appendChild(row);
      })
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
      //Remove item from cart
      dom.addcart.addEventListener('click', UI.removeCourse);
      // Empty cart
      dom.empty.addEventListener('click', UI.emptyCart);
      //On load
      document.addEventListener('DOMContentLoaded', UI.stockDisplayer);
    }
  }
})();
listen.init();
