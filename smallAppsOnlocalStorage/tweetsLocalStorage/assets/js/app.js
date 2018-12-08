// Data Module
const data = (function(){
// PRIVATE
function storageChecker() {
  let stock;
  if(localStorage.getItem('tweets') === null){
      stock = [];
  } else{
      stock = JSON.parse(localStorage.getItem('tweets'));
  }
  return stock;
};
  return{
// PUBLIC
// 1.Save into localStorage DB
    saveLocal: function(item){
      let stock;
      stock = storageChecker(); //stock status
      //stock new one
      stock.push(item);
      //dabase only str
      localStorage.setItem('tweets', JSON.stringify(stock));
      // localStorage.setItem('tweets', item);
    },
// 2. Display stock within localStorage
    readyLocalStorage: function(){
      let stock;
      stock = storageChecker(); //stock status
      //display Items
      stock.forEach((item) =>{
        //dom
        let dom = UI.getDom();
        // Li
        const li = document.createElement('li');//html
        li.innerText = item;
        // anchor
        const link = document.createElement('a');//html
        link.classList.add('delete-button');
        link.innerHTML = "X";
        // Appendings
        li.appendChild(link); // a + li
        dom.listTweets.appendChild(li); // ul +li
      });
    }
  } //return from Module ends here
})();

// UI Module
const UI = (function(){
// PRIVATE
// DOM
  const DOM = {
    listTweets: document.getElementById('list-tweets')
  }
  return{
// PUBLIC
    getDom: function(){
      return DOM;
    },
    agregaTweet: function(e){
      let item = document.getElementById('tweet').value; //input
      if(item.length > 1) {
      // LI
      const li = document.createElement('li');//html
      li.innerText = item;
      // anchor
      const link = document.createElement('a');//html
      link.classList.add('delete-button');
      link.innerHTML = "X";
      // Appendings
      li.appendChild(link); // a + li
      DOM.listTweets.appendChild(li);
      }
      document.getElementById('tweet').value = ' ';
      //localStorage
      data.saveLocal(item);

      e.preventDefault();
      return item;
    },
    removeTweet: function(e){
      if(e.target.className === 'delete-button'){
        console.log('clickaste');
        e.target.parentElement.remove();
      }
      e.preventDefault();
    }
  }
})();

// Event Listeners IIFE MODULE
const runners = (function (){
    let item = document.getElementById('tweet').value.length;
    // formulario
    document.getElementById('form').addEventListener('submit',UI.agregaTweet);
    //list
    document.getElementById('list-tweets').addEventListener('click', UI.removeTweet);
    //page Content
    document.addEventListener('DOMContentLoaded', data.readyLocalStorage);
})();
